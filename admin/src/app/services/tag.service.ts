import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tag {
  tagId?: number;
  tagName: string;
  tagCategory?: string;
  description?: string;
  createdByUserId?: number;
  statusFlag?: boolean;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class TagService {
  private apiUrl = `${environment.apiUrl}/secure/tags`;

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${tagId}`);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  updateTag(tagId: number, tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${tagId}`, tag);
  }

  deleteTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tagId}`);
  }
}
