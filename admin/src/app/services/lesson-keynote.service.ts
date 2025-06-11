import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LessonKeynote {
  keynoteId?: number;
  lessonId: number;
  title: string;
  content: string;
  contentType: 'text' | 'bullet_points' | 'quote' | 'example';
  orderSequence?: number;
  isImportant?: boolean;
  hasVisualAid?: boolean;
  visualAidUrl?: string;
  relatedPlanet?: string;
  relatedZodiac?: string;
  createdAt?: string;
  updatedAt?: string;
  lessonTitle?: string;
  topicTitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LessonKeynoteService {
  private apiUrl = `${environment.apiUrl}/lesson-keynotes`;

  constructor(private http: HttpClient) { }

  // Basic CRUD operations
  getAllKeynotes(): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(this.apiUrl);
  }

  getKeynoteById(id: number): Observable<LessonKeynote> {
    return this.http.get<LessonKeynote>(`${this.apiUrl}/${id}`);
  }

  createKeynote(keynote: LessonKeynote): Observable<LessonKeynote> {
    return this.http.post<LessonKeynote>(this.apiUrl, keynote);
  }

  updateKeynote(id: number, keynote: LessonKeynote): Observable<LessonKeynote> {
    return this.http.put<LessonKeynote>(`${this.apiUrl}/${id}`, keynote);
  }

  deleteKeynote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Specialized operations
  getKeynotesByLessonId(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}`);
  }

  getImportantKeynotesByLessonId(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}/important`);
  }

  getKeynotesByContentType(lessonId: number, contentType: string): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}/content-type/${contentType}`);
  }

  getKeynotesWithVisualAids(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}/visual-aids`);
  }

  getKeynotesByPlanet(planet: string): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/planet/${planet}`);
  }

  getKeynotesByZodiac(zodiac: string): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/zodiac/${zodiac}`);
  }

  searchKeynotes(query: string): Observable<LessonKeynote[]> {
    return this.http.get<LessonKeynote[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }

  reorderKeynotes(lessonId: number, keynoteIds: number[]): Observable<LessonKeynote[]> {
    return this.http.put<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}/reorder`, keynoteIds);
  }
}
