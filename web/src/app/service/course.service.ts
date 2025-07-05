import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageVisibilityService } from './page-visibility.service';

export interface Course {
  courseId: number;
  title: string;
  description: string;
  categoryId: number;
  difficultyLevel: string;
  price?: number;
  thumbnailUrl?: string;
  isPublished: boolean;
  estimatedDuration: number;
}

export interface CourseWithAccess {
  courseId: number;
  title: string;
  description: string;
  loginId: number;
  categoryId: number;
  categoryName?: string;
  difficultyLevel?: string;
  price?: number;
  durationHours?: number;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt?: Date;
  
  // Course type flags
  isFree: boolean;
  isPaid: boolean;
  
  // Access and enrollment info
  isEnrolled: boolean;
  hasAccess: boolean;
  canAccess: boolean;
  
  // Payment details (if enrolled)
  paymentStatus?: string; // 'pending' | 'completed' | null
  paymentDate?: Date;
  transactionId?: string;
  paidAmount?: number;
  paymentMethod?: string;
  paymentProofUrl?: string;
  expiryDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private secureApiUrl = `${environment.apiUrl}/secure/courses`; // Secure user-specific endpoints

  constructor(
    private http: HttpClient,
    private pageVisibilityService: PageVisibilityService
  ) {}

  // Secure API methods - require authentication and include user-specific access data
  // These endpoints moved to /api/secure/courses/** pattern and use POST for security
  getAllCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.post<CourseWithAccess[]>(`${this.secureApiUrl}/with-access`, {});
  }

  getMyCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.post<CourseWithAccess[]>(`${this.secureApiUrl}/my-courses`, {});
  }

  getFreeCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.post<CourseWithAccess[]>(`${this.secureApiUrl}/free`, {});
  }

  getPaidCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.post<CourseWithAccess[]>(`${this.secureApiUrl}/paid`, {});
  }

  // Basic course API methods - require authentication but no user-specific data
  getAllCourses(): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.secureApiUrl}/get-all`, {});
  }

  getCourseById(courseId: number): Observable<Course> {
    // Use the correct format expected by SecureIdRequest DTO
    return this.http.post<Course>(`${this.secureApiUrl}/get-by-id`, { id: courseId });
  }
  getCoursesByCategoryId(categoryId: number): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.secureApiUrl}/get-by-category`, { id: categoryId });
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.secureApiUrl}`, course);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.secureApiUrl}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.secureApiUrl}/${courseId}`);
  }

  // Page visibility aware methods
  /**
   * Get all courses with access information, but only if page is visible
   * Returns empty observable if page is hidden
   */
  getAllCoursesWithAccessWhenVisible(): Observable<CourseWithAccess[]> {
    if (!this.pageVisibilityService.isPageVisible) {
      console.log('Page is hidden, skipping getAllCoursesWithAccess API call');
      return EMPTY;
    }
    return this.getAllCoursesWithAccess();
  }

  /**
   * Get user's enrolled courses, but only if page is visible
   * Returns empty observable if page is hidden
   */
  getMyCoursesWithAccessWhenVisible(): Observable<CourseWithAccess[]> {
    if (!this.pageVisibilityService.isPageVisible) {
      console.log('Page is hidden, skipping getMyCoursesWithAccess API call');
      return EMPTY;
    }
    return this.getMyCoursesWithAccess();
  }

  /**
   * Get free courses, but only if page is visible
   * Returns empty observable if page is hidden
   */
  getFreeCoursesWithAccessWhenVisible(): Observable<CourseWithAccess[]> {
    if (!this.pageVisibilityService.isPageVisible) {
      console.log('Page is hidden, skipping getFreeCoursesWithAccess API call');
      return EMPTY;
    }
    return this.getFreeCoursesWithAccess();
  }

  /**
   * Get paid courses, but only if page is visible
   * Returns empty observable if page is hidden
   */
  getPaidCoursesWithAccessWhenVisible(): Observable<CourseWithAccess[]> {
    if (!this.pageVisibilityService.isPageVisible) {
      console.log('Page is hidden, skipping getPaidCoursesWithAccess API call');
      return EMPTY;
    }
    return this.getPaidCoursesWithAccess();
  }
}
