import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Update the import path if your environment file is located elsewhere
import { environment } from '../../environments/environment';

export interface Category {
  categoryId?: number;
  name: string;
  description: string;
  categoryType?: string;
  isPublished?: boolean;
  thumbnailUrl?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/secure/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-all`, {});
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/get-by-id`, { id: id });
  }

  getRootCategories(): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-root`, {});
  }

  getCategoriesByParent(parentId: number): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-by-parent`, { parentId: parentId });
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
