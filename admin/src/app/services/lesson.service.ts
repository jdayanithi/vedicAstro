import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Lesson {
  lessonId: number;
  topicId: number;
  title: string;
  description: string;
  contentType: 'video' | 'article' | 'quiz' | 'exercise';
  contentUrl: string;
  durationMinutes: number;
  orderNumber: number;
  isFree: boolean;
  statusFlag?: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  topicTitle?: string; // Optional for joined queries
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = `${environment.apiUrl}/secure/lessons`;
  constructor(private http: HttpClient) {}

  getAllLessons(): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-all`, {});
  }

  getLessonsByTopicId(topicId: number): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-by-topic`, { topicId: topicId });
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/get-by-id`, { id: id });
  }

  getLessonDetails(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-details`, { id: id });
  }

  createLesson(lesson: Partial<Lesson>): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiUrl, lesson);
  }

  updateLesson(id: number, lesson: Partial<Lesson>): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiUrl}/${id}`, lesson);
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
