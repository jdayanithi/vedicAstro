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
  private apiUrl = `${environment.apiUrl}/secure/topics`;

  constructor(private http: HttpClient) {}

  getTopicsByCourseId(courseId: number): Observable<Topic[]> {
    return this.http.post<Topic[]>(`${this.apiUrl}/get-by-course`, { courseId });
  }

  getTopicById(topicId: number): Observable<Topic> {
    return this.http.post<Topic>(`${this.apiUrl}/get-by-id`, { id: topicId });
  }
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = `${environment.apiUrl}/secure/lessons`;

  constructor(private http: HttpClient) {}

  getLessonsByTopicId(topicId: number): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-by-topic`, { id: topicId });
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/get-by-id`, { id: lessonId });
  }

  getLessonDetails(lessonId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/get-details`, { id: lessonId });
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.apiUrl}/get-all`, {});
  }
}

@Injectable({
  providedIn: 'root'
})
export class LessonKeynoteService {
  private apiUrl = `${environment.apiUrl}/secure/lesson-keynotes`;

  constructor(private http: HttpClient) {}

  getKeynotesByLessonId(lessonId: number): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-by-lesson`, { lessonId: lessonId });
  }

  getAllKeynotes(): Observable<LessonKeynote[]> {
    return this.http.post<LessonKeynote[]>(`${this.apiUrl}/get-all`, {});
  }

  getKeynoteById(keynoteId: number): Observable<LessonKeynote> {
    return this.http.post<LessonKeynote>(`${this.apiUrl}/get-by-id`, { id: keynoteId });
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
}

@Injectable({
  providedIn: 'root'
})
export class LessonTagService {
  private apiUrl = `${environment.apiUrl}/secure/lesson-tags`;

  constructor(private http: HttpClient) {}

  getTagsByLessonId(lessonId: number): Observable<LessonTag[]> {
    return this.http.post<LessonTag[]>(`${this.apiUrl}/get-by-lesson`, { lessonId: lessonId });
  }

  getAllLessonTags(): Observable<LessonTag[]> {
    return this.http.post<LessonTag[]>(`${this.apiUrl}/get-all`, {});
  }

  getTagsByTagId(tagId: number): Observable<LessonTag[]> {
    return this.http.post<LessonTag[]>(`${this.apiUrl}/get-by-tag`, { tagId: tagId });
  }

  getLessonTagById(lessonTagId: number): Observable<LessonTag> {
    return this.http.post<LessonTag>(`${this.apiUrl}/get-by-id`, { id: lessonTagId });
  }
}
