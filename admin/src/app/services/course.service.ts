import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-all`, {});
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/get-by-id`, { id: id });
  }

  getCoursesByCategory(categoryId: number): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-by-category`, { categoryId: categoryId });
  }

  getCoursesByLogin(loginId: number): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-by-login`, { loginId: loginId });
  }

  getPublishedCourses(): Observable<Course[]> {
    return this.http.post<Course[]>(`${this.apiUrl}/get-published`, {});
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
