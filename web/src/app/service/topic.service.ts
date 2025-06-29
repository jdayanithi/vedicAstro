import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LessonKeynote {
  keynoteId: number;
  lessonId: number;
  title: string;
  content: string;
  isImportant: boolean;
  relatedPlanet?: string;
  relatedZodiac?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  tagId: number;
  tagName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonDetail {
  lessonId: number;
  title: string;
  description: string;
  content: string;
  topicId: number;
  orderNumber: number;
  isFree: boolean;
  durationMinutes: number;
  videoUrl?: string;
  audioUrl?: string;
  documentUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  keynotes: LessonKeynote[];
  tags: Tag[];
}

export interface TopicDetail {
  topicId: number;
  title: string;
  description: string;
  courseId: number;
  orderNumber: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  lessons: LessonDetail[];
}

export interface Topic {
  topicId: number;
  title: string;
  description: string;
  courseId: number;
  orderNumber: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = `${environment.apiUrl}/secure/topics`;

  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  getTopicById(topicId: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${topicId}`);
  }

  getTopicsByCourseId(courseId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getTopicDetails(topicId: number): Observable<TopicDetail> {
    return this.http.get<TopicDetail>(`${this.apiUrl}/${topicId}/details`);
  }

  createTopic(topic: Partial<Topic>): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }

  updateTopic(topicId: number, topic: Partial<Topic>): Observable<Topic> {
    return this.http.put<Topic>(`${this.apiUrl}/${topicId}`, topic);
  }

  deleteTopic(topicId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${topicId}`);
  }
}
