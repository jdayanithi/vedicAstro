import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface KeynoteTag {
  keynoteTagId?: number;
  keynoteId: number;
  tagId: number;
  relevanceScore?: number;
  createdAt?: Date;
  // Optional enriched fields
  keynoteTitle?: string;
  tagName?: string;
  tagCategory?: string;
}

@Injectable({
  providedIn: 'root'
})
export class KeynoteTagService {
  private apiUrl = `${environment.apiUrl}/keynote-tags`;

  constructor(private http: HttpClient) {}

  // Get all keynote tags
  getAllKeynoteTags(): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-all`, {});
  }

  // Get keynote tag by ID
  getKeynoteTagById(keynoteTagId: number): Observable<KeynoteTag> {
    return this.http.post<KeynoteTag>(`${this.apiUrl}/get-by-id`, { id: keynoteTagId });
  }

  // Get tags by keynote ID
  getTagsByKeynoteId(keynoteId: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-by-keynote`, { keynoteId });
  }

  // Get keynotes by tag ID
  getKeynotesByTagId(tagId: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-by-tag`, { tagId });
  }

  // Get keynote tags by lesson ID
  getKeynoteTagsByLessonId(lessonId: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-by-lesson`, { lessonId });
  }

  // Get tags by keynote ID with minimum relevance score
  getTagsByKeynoteIdWithMinRelevance(keynoteId: number, minScore: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-keynote-tags-with-relevance`, { keynoteId, minScore });
  }

  // Get keynotes by tag ID with minimum relevance score
  getKeynotesByTagIdWithMinRelevance(tagId: number, minScore: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-tag-keynotes-with-relevance`, { tagId, minScore });
  }

  // Get top tags by relevance for a keynote
  getTopTagsByKeynoteId(keynoteId: number): Observable<KeynoteTag[]> {
    return this.http.post<KeynoteTag[]>(`${this.apiUrl}/get-top-tags`, { keynoteId });
  }

  // Create keynote tag association
  createKeynoteTag(keynoteTag: KeynoteTag): Observable<KeynoteTag> {
    return this.http.post<KeynoteTag>(this.apiUrl, keynoteTag);
  }

  // Update keynote tag
  updateKeynoteTag(keynoteTagId: number, keynoteTag: Partial<KeynoteTag>): Observable<KeynoteTag> {
    return this.http.put<KeynoteTag>(`${this.apiUrl}/${keynoteTagId}`, keynoteTag);
  }

  // Delete keynote tag by ID
  deleteKeynoteTag(keynoteTagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${keynoteTagId}`);
  }

  // Delete keynote tag by keynote and tag IDs
  deleteKeynoteTagByKeynoteAndTag(keynoteId: number, tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/keynote/${keynoteId}/tag/${tagId}`);
  }
}
