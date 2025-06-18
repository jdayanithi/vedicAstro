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
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  profilePicture: string;
  bio: string;
  userType: string;
  zodiacSign: string;
  risingSign: string;
  moonSign: string;
}

interface RegisterRequest {
  email: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  bio: string;
  userType: string;
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
  
  // Store the URL the user wanted to access before being redirected to login
  redirectUrl: string | null = null;

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
  }  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/validate`, { username: email, password })
      .pipe(
        tap((response: LoginResponse) => {
          this.handleLoginSuccess(response);
        })
      );
  }

  googleLogin(googleToken: string): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/google`, { token: googleToken })
      .pipe(
        tap((response: LoginResponse) => {
          this.handleLoginSuccess(response);
        })
      );
  }

  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('session', JSON.stringify({
      email: response.username,
      role: response.role,
      firstName: response.firstName,
      lastName: response.lastName,
      birthDate: response.birthDate,
      birthTime: response.birthTime,
      birthPlace: response.birthPlace,
      userType: response.userType,
      zodiacSign: response.zodiacSign,
      risingSign: response.risingSign,
      moonSign: response.moonSign,
      timestamp: new Date()
    }));
    this.isAuthenticated.next(true);
    this.currentUserRole.next(response.role);
    
    // Redirect to the originally intended URL or default to landing page
    const redirectTo = this.redirectUrl || '/landing';
    this.redirectUrl = null; // Clear the redirect URL
    this.router.navigate([redirectTo]);
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
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
