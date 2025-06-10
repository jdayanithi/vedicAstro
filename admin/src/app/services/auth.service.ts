import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
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

export interface RegisterRequest {
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
  private currentUser = new BehaviorSubject<LoginResponse | null>(null);
  private platformId = inject(PLATFORM_ID);
  private tokenExpirationTimer: any;

  isLoggedIn$ = this.isAuthenticated.asObservable();
  userRole$ = this.currentUserRole.asObservable();
  currentUser$ = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkSession();
  }

  private checkSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const session = this.getSession();
      
      if (token && session) {
        this.isAuthenticated.next(true);
        this.currentUserRole.next(session.role);
        this.currentUser.next(session);
        
        // Check token expiration
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
          const now = Date.now();
          
          if (expirationTime > now) {
            // Set timer for auto logout
            this.autoLogoutTimer(expirationTime - now);
          } else {
            this.logout();
          }
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  private autoLogoutTimer(duration: number) {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private getSession(): LoginResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      const sessionData = localStorage.getItem('session');
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }

  getCurrentUser(): LoginResponse | null {
    return this.getSession();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login/validate`, { username: email, password })
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('session', JSON.stringify(response));
            
            // Set auto logout timer
            try {
              const tokenData = JSON.parse(atob(response.token.split('.')[1]));
              const expirationTime = tokenData.exp * 1000;
              this.autoLogoutTimer(expirationTime - Date.now());
            } catch (e) {
              console.error('Error setting auto logout timer:', e);
            }
          }
          this.isAuthenticated.next(true);
          this.currentUserRole.next(response.role);
          this.currentUser.next(response);
        })
      );
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, data);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
      }
    }
    this.isAuthenticated.next(false);
    this.currentUserRole.next(null);
    this.currentUser.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }
}
