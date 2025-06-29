import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LessonTag {
  lessonTagId?: number;
  lessonId: number;
  tagId: number;
  relevanceScore?: number;
  tagName?: string;
}

@Injectable({ providedIn: 'root' })
export class LessonTagService {
  private apiUrl = `${environment.apiUrl}/secure/lesson-tags`;

  constructor(private http: HttpClient) {}

  getTagsByLessonId(lessonId: number): Observable<LessonTag[]> {
    return this.http.get<LessonTag[]>(`${this.apiUrl}/lesson/${lessonId}`);
  }

  addLessonTag(lessonTag: LessonTag): Observable<LessonTag> {
    return this.http.post<LessonTag>(this.apiUrl, lessonTag);
  }

  updateLessonTag(lessonTagId: number, lessonTag: LessonTag): Observable<LessonTag> {
    return this.http.put<LessonTag>(`${this.apiUrl}/${lessonTagId}`, lessonTag);
  }

  deleteLessonTag(lessonTagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonTagId}`);
  }
}
