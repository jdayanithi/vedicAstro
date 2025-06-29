import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  categoryId: number;
  name: string;
  description: string;
  categoryType: string;
  isPublished: boolean;
  thumbnailUrl?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/secure/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-all`, {});
  }

  getRootCategories(): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-root`, {});
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/get-by-id`, { id: categoryId });
  }

  getSubcategories(parentId: number): Observable<Category[]> {
    return this.http.post<Category[]>(`${this.apiUrl}/get-subcategories`, { parentId: parentId });
  }
}
