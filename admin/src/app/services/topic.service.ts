import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Topic {
  topicId: number;
  courseId: number;
  title: string;
  description: string;
  orderNumber: number;
  statusFlag?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private apiUrl = `${environment.apiUrl}/topics`;

  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }

  getTopicsByCourseId(courseId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getTopicById(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${id}`);
  }

  createTopic(topic: Partial<Topic>): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }

  updateTopic(id: number, topic: Partial<Topic>): Observable<Topic> {
    return this.http.put<Topic>(`${this.apiUrl}/${id}`, topic);
  }

  deleteTopic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
