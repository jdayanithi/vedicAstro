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
  private apiUrl = `${environment.apiUrl}/secure/lesson-keynotes`;

  constructor(private http: HttpClient) { }

  // Basic CRUD operations
  getAllKeynotes(): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-all`, {});
  }

  getKeynoteById(id: number): Observable<LessonKeynote> {
    return this.http.post<LessonKeynote>(`${this.apiUrl}/get-by-id`, { id: id });
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
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-by-lesson`, { lessonId: lessonId });
  }

  getImportantKeynotesByLessonId(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-important-by-lesson`, { lessonId: lessonId });
  }

  getKeynotesByContentType(lessonId: number, contentType: string): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-by-content-type`, { lessonId: lessonId, contentType: contentType });
  }

  getKeynotesWithVisualAids(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-visual-aids-by-lesson`, { lessonId: lessonId });
  }

  getKeynotesByPlanet(planet: string): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-by-planet`, { planet: planet });
  }

  getKeynotesByZodiac(zodiac: string): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-by-zodiac`, { zodiac: zodiac });
  }

  searchKeynotes(query: string): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/search`, { query: query });
  }

  reorderKeynotes(lessonId: number, keynoteIds: number[]): Observable<LessonKeynote[]> {
    return this.http.put<LessonKeynote[]>(`${this.apiUrl}/lesson/${lessonId}/reorder`, keynoteIds);
  }

  // Add paginated fetch to the service
  getKeynotesPaginated(page: number, size: number, lessonId?: number, contentType?: string, importantOnly?: boolean, searchQuery?: string) {
    const requestBody = {
      page: page,
      size: size,
      lessonId: lessonId,
      contentType: contentType,
      importantOnly: importantOnly,
      search: searchQuery
    };
    return this.http.post<{ content: LessonKeynote[], totalElements: number }>(`${this.apiUrl}/get-paginated`, requestBody);
  }
}
