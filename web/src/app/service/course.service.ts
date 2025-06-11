import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = '/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`);
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
