import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json;charset=UTF-8'
    })
  };
  
  constructor(private http: HttpClient) {}

  getAllLessons(): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-all`, {});
  }

  getLessonsByTopicId(topicId: number): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-by-topic`, { id: topicId });
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/get-by-id`, { id: id });
  }

  getLessonDetails(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-details`, { id: id });
  }

  createLesson(lesson: Partial<Lesson>): Observable<Lesson> {
    const processedLesson = this.preprocessLessonContent(lesson);
    console.log('📝 Creating lesson with processed content:', processedLesson);
    return this.http.post<Lesson>(`${this.apiUrl}/create`, processedLesson, this.httpOptions);
  }

  updateLesson(id: number, lesson: Partial<Lesson>): Observable<Lesson> {
    const processedLesson = this.preprocessLessonContent(lesson);
    const updateRequest = { id, ...processedLesson };
    console.log('📝 Updating lesson with processed content:', updateRequest);
    return this.http.post<Lesson>(`${this.apiUrl}/update`, updateRequest, this.httpOptions);
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete`, { id }, this.httpOptions);
  }

  /**
   * Preprocess lesson content to ensure it passes SQL injection validation
   */
  private preprocessLessonContent(lesson: Partial<Lesson>): Partial<Lesson> {
    const processed = { ...lesson };
    
    // Ensure rich content fields are properly formatted
    if (processed.description) {
      // Add a special marker to indicate this is rich content
      processed.description = this.ensureRichContentSafe(processed.description);
      console.log('🔍 Processed description length:', processed.description.length);
    }
    
    return processed;
  }

  /**
   * Ensure rich content is safe for SQL injection validation bypass
   */
  private ensureRichContentSafe(content: string): string {
    if (!content) return content;
    
    // Remove any extremely dangerous patterns while preserving Tamil and HTML
    let safeContent = content;
    
    // Remove script tags and javascript: links for security
    safeContent = safeContent.replace(/<script[^>]*>.*?<\/script>/gi, '');
    safeContent = safeContent.replace(/javascript:/gi, '');
    safeContent = safeContent.replace(/vbscript:/gi, '');
    
    // Remove dangerous event handlers
    safeContent = safeContent.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    return safeContent;
  }
}
