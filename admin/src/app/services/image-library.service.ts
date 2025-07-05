import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ImageLibrary {
  imageId?: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  altText?: string;
  tags?: string;
  lesson?: any;
  topic?: any;
  course?: any;
  category: ImageCategory;
  isPublic: boolean;
  isFeatured: boolean;
  statusFlag: boolean;
  uploadedBy: string;
  uploadDate: string;
  updatedAt: string;
}

export enum ImageCategory {
  LESSON_CONTENT = 'LESSON_CONTENT',
  TOPIC_THUMBNAIL = 'TOPIC_THUMBNAIL',
  COURSE_BANNER = 'COURSE_BANNER',
  ILLUSTRATION = 'ILLUSTRATION',
  DIAGRAM = 'DIAGRAM',
  ICON = 'ICON',
  BACKGROUND = 'BACKGROUND',
  PROFILE = 'PROFILE',
  GENERAL = 'GENERAL',
  MARKETING = 'MARKETING'
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ImageStatistics {
  totalFileSize: number;
  categoryStatistics: any[];
  totalImages?: number;
  totalFileSizeFormatted?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageLibraryService {
  private baseUrl = `${environment.apiUrl}/secure/images`;

  constructor(private http: HttpClient) {}

  // Get all images with pagination
  getAllImages(page: number = 0, size: number = 10, sortBy: string = 'uploadDate', sortDir: string = 'desc'): Observable<PageResponse<ImageLibrary>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);
    
    console.log('Making POST request to:', `${this.baseUrl}/get-all`);
    console.log('With params:', params.toString());
    
    return this.http.post<PageResponse<ImageLibrary>>(`${this.baseUrl}/get-all`, {}, { params }).pipe(
      tap((response: any) => console.log('Image library response:', response)),
      catchError((error: any) => {
        console.error('Image library error:', error);
        if (error.status === 403) {
          console.error('Authentication required: Please log in to access the image library');
        } else if (error.status === 401) {
          console.error('Invalid or expired token: Please log in again');
        }
        throw error;
      })
    );
  }

  // Get image by ID
  getImageById(id: number): Observable<ImageLibrary> {
    return this.http.get<ImageLibrary>(`${this.baseUrl}/${id}`);
  }

  // Get image URL for viewing
  getImageUrl(id: number): string {
    return `${this.baseUrl}/${id}/view`;
  }

  // Upload single image
  uploadImage(file: File, metadata: Partial<ImageLibrary>): Observable<ImageLibrary> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.altText) formData.append('altText', metadata.altText);
    if (metadata.tags) formData.append('tags', metadata.tags);
    if (metadata.category) formData.append('category', metadata.category);
    if (metadata.lesson?.lessonId) formData.append('lessonId', metadata.lesson.lessonId.toString());
    if (metadata.topic?.topicId) formData.append('topicId', metadata.topic.topicId.toString());
    if (metadata.course?.id) formData.append('courseId', metadata.course.id.toString());
    if (metadata.uploadedBy) formData.append('uploadedBy', metadata.uploadedBy);

    return this.http.post<ImageLibrary>(`${this.baseUrl}/upload`, formData);
  }

  // Upload multiple images
  uploadMultipleImages(files: File[], category?: ImageCategory, lessonId?: number, topicId?: number, courseId?: number, uploadedBy?: string): Observable<ImageLibrary[]> {
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });
    
    if (category) formData.append('category', category);
    if (lessonId) formData.append('lessonId', lessonId.toString());
    if (topicId) formData.append('topicId', topicId.toString());
    if (courseId) formData.append('courseId', courseId.toString());
    if (uploadedBy) formData.append('uploadedBy', uploadedBy);

    return this.http.post<ImageLibrary[]>(`${this.baseUrl}/upload/multiple`, formData);
  }

  // Update image details
  updateImage(id: number, image: Partial<ImageLibrary>): Observable<ImageLibrary> {
    return this.http.put<ImageLibrary>(`${this.baseUrl}/${id}`, image);
  }

  // Update image associations
  updateImageAssociations(id: number, lessonId?: number, topicId?: number, courseId?: number): Observable<any> {
    let params = new HttpParams();
    if (lessonId) params = params.set('lessonId', lessonId.toString());
    if (topicId) params = params.set('topicId', topicId.toString());
    if (courseId) params = params.set('courseId', courseId.toString());

    return this.http.put(`${this.baseUrl}/${id}/associations`, null, { params });
  }

  // Delete image (hard delete)
  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Soft delete image
  disableImage(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/disable`, null);
  }

  // Delete multiple images
  deleteMultipleImages(imageIds: number[]): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bulk`, { body: imageIds });
  }

  // Search images
  searchImages(searchTerm: string, page: number = 0, size: number = 10): Observable<PageResponse<ImageLibrary>> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.post<PageResponse<ImageLibrary>>(`${this.baseUrl}/search`, {}, { params });
  }

  // Filter images
  filterImages(filters: {
    category?: ImageCategory;
    lessonId?: number;
    topicId?: number;
    courseId?: number;
    searchTerm?: string;
    page?: number;
    size?: number;
  }): Observable<PageResponse<ImageLibrary>> {
    let params = new HttpParams()
      .set('page', (filters.page || 0).toString())
      .set('size', (filters.size || 10).toString());

    if (filters.category) params = params.set('category', filters.category);
    if (filters.lessonId) params = params.set('lessonId', filters.lessonId.toString());
    if (filters.topicId) params = params.set('topicId', filters.topicId.toString());
    if (filters.courseId) params = params.set('courseId', filters.courseId.toString());
    if (filters.searchTerm) params = params.set('searchTerm', filters.searchTerm);

    return this.http.post<PageResponse<ImageLibrary>>(`${this.baseUrl}/filter`, {}, { params });
  }

  // Get images by category
  getImagesByCategory(category: ImageCategory, page: number = 0, size: number = 10): Observable<PageResponse<ImageLibrary>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<ImageLibrary>>(`${this.baseUrl}/category/${category}`, { params });
  }

  // Get images by lesson
  getImagesByLesson(lessonId: number): Observable<ImageLibrary[]> {
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/lesson/${lessonId}`);
  }

  // Get images by topic
  getImagesByTopic(topicId: number): Observable<ImageLibrary[]> {
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/topic/${topicId}`);
  }

  // Get images by course
  getImagesByCourse(courseId: number): Observable<ImageLibrary[]> {
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/course/${courseId}`);
  }

  // Get featured images
  getFeaturedImages(): Observable<ImageLibrary[]> {
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/featured`);
  }

  // Get recently uploaded images
  getRecentImages(limit: number = 10): Observable<ImageLibrary[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/recent`, { params });
  }

  // Get orphaned images
  getOrphanedImages(): Observable<ImageLibrary[]> {
    return this.http.get<ImageLibrary[]>(`${this.baseUrl}/orphaned`);
  }

  // Get image statistics
  getImageStatistics(): Observable<ImageStatistics> {
    return this.http.get<ImageStatistics>(`${this.baseUrl}/statistics`);
  }

  // Get all categories
  getImageCategories(): Observable<ImageCategory[]> {
    return this.http.get<ImageCategory[]>(`${this.baseUrl}/categories`);
  }

  // Utility methods
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getCategoryDisplayName(category: ImageCategory): string {
    const displayNames: { [key in ImageCategory]: string } = {
      [ImageCategory.LESSON_CONTENT]: 'Lesson Content',
      [ImageCategory.TOPIC_THUMBNAIL]: 'Topic Thumbnail',
      [ImageCategory.COURSE_BANNER]: 'Course Banner',
      [ImageCategory.ILLUSTRATION]: 'Illustration',
      [ImageCategory.DIAGRAM]: 'Diagram',
      [ImageCategory.ICON]: 'Icon',
      [ImageCategory.BACKGROUND]: 'Background',
      [ImageCategory.PROFILE]: 'Profile',
      [ImageCategory.GENERAL]: 'General',
      [ImageCategory.MARKETING]: 'Marketing'
    };
    return displayNames[category] || category;
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }
}
