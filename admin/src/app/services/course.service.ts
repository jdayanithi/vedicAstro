import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Course {
  courseId: number;
  title: string;
  description: string;
  loginId: number;
  categoryId: number;
  difficultyLevel: string;
  price: number;
  durationHours: number;
  thumbnailUrl: string;
  isPublished: boolean;
  statusFlag?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/secure/courses`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-all`, {}).pipe(
      map(courses => this.sanitizeCourseData(courses))
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/get-by-id`, { id: id }).pipe(
      map(course => this.sanitizeSingleCourse(course))
    );
  }

  getCoursesByCategory(categoryId: number): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-by-category`, { categoryId: categoryId }).pipe(
      map(courses => this.sanitizeCourseData(courses))
    );
  }

  getCoursesByLogin(loginId: number): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-by-login`, { loginId: loginId }).pipe(
      map(courses => this.sanitizeCourseData(courses))
    );
  }

  getPublishedCourses(): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-published`, {}).pipe(
      map(courses => this.sanitizeCourseData(courses))
    );
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/create`, course, this.httpOptions).pipe(
      map(course => this.sanitizeSingleCourse(course))
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    const updateRequest = { id, ...course };
    return this.http.post<Course>(`${this.apiUrl}/update`, updateRequest, this.httpOptions).pipe(
      map(course => this.sanitizeSingleCourse(course))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete`, { id });
  }

  // 🔒 Copy protection methods

  /**
   * Sanitize course data to prevent content extraction
   */
  private sanitizeCourseData(courses: Course[]): Course[] {
    return courses.map(course => this.sanitizeSingleCourse(course));
  }

  /**
   * Sanitize individual course data
   */
  private sanitizeSingleCourse(course: Course): Course {
    // Add protection markers to sensitive content
    if (course.description) {
      course.description = this.addProtectionMarkers(course.description);
    }
    
    if (course.title) {
      course.title = this.addProtectionMarkers(course.title);
    }

    return course;
  }

  /**
   * Add invisible protection markers to content
   */
  private addProtectionMarkers(content: string): string {
    // Add zero-width characters to make copying less useful
    const protectedContent = content
      .split('')
      .map((char, index) => {
        // Add zero-width space every few characters
        if (index % 10 === 0 && index > 0) {
          return '\u200B' + char; // Zero-width space
        }
        return char;
      })
      .join('');

    return protectedContent;
  }

  /**
   * Get course content for display (removes protection markers)
   */
  public getDisplayContent(content: string): string {
    if (!content) return '';
    
    // Remove zero-width characters for proper display
    return content.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
  }

  /**
   * Check if content should be protected from copying
   */
  public isProtectedContent(course: Course): boolean {
    // All course content should be protected
    return true;
  }

  /**
   * Get protected course content with additional obfuscation
   */
  public getProtectedContent(content: string): string {
    if (!content) return '';
    
    // Add protection and return
    return this.addProtectionMarkers(content);
  }
}
