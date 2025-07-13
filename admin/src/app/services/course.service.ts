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
    console.log('🔄 CourseService.updateCourse - sending request:', updateRequest);
    return this.http.post<Course>(`${this.apiUrl}/update`, updateRequest, this.httpOptions).pipe(
      map(course => this.sanitizeSingleCourse(course))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete`, { id });
  }

  // 🔒 Copy protection methods

  /**
   * Sanitize course data - Remove copy protection to ensure proper Tamil text storage
   */
  private sanitizeCourseData(courses: Course[]): Course[] {
    return courses;  // No protection applied to stored data
  }

  /**
   * Sanitize individual course data - Remove copy protection to ensure proper Tamil text storage
   */
  private sanitizeSingleCourse(course: Course): Course {
    // No protection applied to stored data
    return course;
  }

  /**
   * Get course content for display (now returns content as-is since no protection markers are added)
   */
  public getDisplayContent(content: string): string {
    if (!content) return '';
    
    // Return content as-is since we're no longer adding protection markers
    return content;
  }

  /**
   * Check if content should be protected from copying
   */
  public isProtectedContent(course: Course): boolean {
    // All course content should be protected
    return true;
  }

  /**
   * Get protected course content (now returns content as-is since we're not using protection markers)
   */
  public getProtectedContent(content: string): string {
    if (!content) return '';
    
    // Return content as-is since we're no longer adding protection markers
    return content;
  }
}
