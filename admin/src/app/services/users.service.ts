import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }
  searchUsers(query: string): Observable<User[]> {
    // Don't make API call if query is empty
    if (!query || query.trim() === '') {
      return new Observable<User[]>(subscriber => {
        subscriber.next([]);
        subscriber.complete();
      });
    }
    console.log('Searching users with query:', query);
    return this.http.get<User[]>(`${this.apiUrl}/search?query=${query}`);
  }
}
