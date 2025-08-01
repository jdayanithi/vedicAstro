import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  username: string;
  password?: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  profilePicture?: string;
  bio?: string;
  userType: 'student' | 'instructor' | 'admin';
  zodiacSign?: string;
  risingSign?: string;
  moonSign?: string;
  createdDate?: string;
  updatedDate?: string;
  createdBy?: string;
  updatedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/secure/admin/users`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}/get-all`, {});
  }

  getUserById(id: number): Observable<User> {
    console.log('🔧 UserService: Getting user by ID:', id);
    console.log('🔧 UserService: API URL:', `${this.apiUrl}/get-by-id`);
    return this.http.post<User>(`${this.apiUrl}/get-by-id`, { id });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string): Observable<User[]> {
    // Don't make API call if query is empty
    if (!query || query.trim() === '') {
      return new Observable<User[]>(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }
    console.log('Searching users with query:', query);
    return this.http.post<User[]>(`${this.apiUrl}/search`, { query });
  }

  // Debug method to check authentication
  checkAuthInfo(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/secure/debug/auth-info`, {});
  }
}
