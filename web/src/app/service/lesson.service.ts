import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Topic {
  topicId: number;
  title: string;
  description: string;
  courseId: number;
  orderIndex: number;
  estimatedDuration: number;
  lessons: Lesson[];
}

export interface Lesson {
  lessonId: number;
  title: string;
  description: string;
  topicId: number;
  orderIndex: number;
  videoUrl?: string;
  duration: number;
  isFree: boolean;
  keynotes?: LessonKeynote[];
  tags?: LessonTag[];
}

export interface LessonKeynote {
  keynoteId: number;
  title: string;
  content: string;
  lessonId: number;
  isImportant: boolean;
  relatedPlanet?: string;
  relatedZodiac?: string;
  orderIndex: number;
}

export interface LessonTag {
  lessonTagId: number;
  lessonId: number;
  tagId: number;
  tagName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = `${environment.apiUrl}/topics`;

  constructor(private http: HttpClient) {}

  getTopicsByCourseId(courseId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getTopicById(topicId: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${topicId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = `${environment.apiUrl}/lessons`;

  constructor(private http: HttpClient) {}

  getLessonsByTopicId(topicId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/topic/${topicId}`);
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${lessonId}`);
  }

  getLessonDetails(lessonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${lessonId}/details`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LessonKeynoteService {
  private apiUrl = `${environment.apiUrl}/lesson-keynotes`;

  constructor(private http: HttpClient) {}

  getKeynotesByLessonId(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LessonTagService {
  private apiUrl = `${environment.apiUrl}/lesson-tags`;

  constructor(private http: HttpClient) {}

  getTagsByLessonId(lessonId: number): Observable<LessonTag[]> {
    return this.http.get<LessonTag[]>(`${this.apiUrl}/lesson/${lessonId}`);
  }
}
