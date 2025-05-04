import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  token: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string | null>(null);
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkSession();
  }

  private checkSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
      const session = this.getSession();
      if (session) {
        this.currentUserRole.next(session.role);
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/validate`, { username: email, password })
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('session', JSON.stringify({
            email: response.username,
            role: response.role,
            firstName: response.firstName,
            lastName: response.lastName,
            timestamp: new Date()
          }));
          this.isAuthenticated.next(true);
          this.currentUserRole.next(response.role);
        })
      );
  }

  register(email: string, phoneNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, phoneNumber });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    this.isAuthenticated.next(false);
    this.currentUserRole.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  isAdmin(): boolean {
    const session = this.getSession();
    return session?.role === 'Admin';
  }

  getSession(): any {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
