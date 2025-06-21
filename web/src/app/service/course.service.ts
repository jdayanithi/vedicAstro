import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}  // New unified API methods
  getAllCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.get<CourseWithAccess[]>(`${this.apiUrl}/with-access`);
  }

  getMyCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.get<CourseWithAccess[]>(`${this.apiUrl}/my-courses`);
  }

  getFreeCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.get<CourseWithAccess[]>(`${this.apiUrl}/free`);
  }

  getPaidCoursesWithAccess(): Observable<CourseWithAccess[]> {
    return this.http.get<CourseWithAccess[]>(`${this.apiUrl}/paid`);
  }

  // Legacy methods - keeping for backward compatibility
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${courseId}`);
  }
  getCoursesByCategoryId(categoryId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }
}
