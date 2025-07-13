import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
  token: string;
}

export interface UserProfile {
  userId: number;
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
  private currentUser = new BehaviorSubject<UserProfile | null>(null);
  private platformId = inject(PLATFORM_ID);
  private tokenExpirationTimer: any;
  private isInitialized = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isAuthenticated.asObservable();
  userRole$ = this.currentUserRole.asObservable();
  currentUser$ = this.currentUser.asObservable();
  isInitialized$ = this.isInitialized.asObservable();

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

      console.log('🔍 Checking session - Token exists:', !!token, 'Session exists:', !!session);

      if (token && session) {
        console.log('🔍 Validating token with backend...');
        // Validate token with backend instead of just local parsing
        this.validateToken().subscribe({
          next: (isValid: boolean) => {
            console.log('🔍 Token validation result:', isValid);
            if (isValid) {
              this.isAuthenticated.next(true);
              this.currentUserRole.next(session.role);
              this.currentUser.next(session);
              console.log('✅ User authenticated with role:', session.role);

              // Set auto logout timer based on JWT expiration
              try {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
                const now = Date.now();

                if (expirationTime > now) {
                  this.autoLogoutTimer(expirationTime - now);
                } else {
                  this.logout();
                }
              } catch (e) {
                console.log('❌ Error parsing token - logging out');
                this.logout();
              }
            } else {
              console.log('❌ Token validation failed - logging out');
              this.logout();
            }
            // Mark as initialized after validation completes
            this.isInitialized.next(true);
          },
          error: (error) => {
            console.error('❌ Token validation error:', error);
            this.logout();
            // Mark as initialized even after error
            this.isInitialized.next(true);
          }
        });
      } else if (token) {
        // Token exists but no session, validate token then fetch profile
        this.validateToken().subscribe({
          next: (isValid: boolean) => {
            if (isValid) {
              this.fetchUserProfile().subscribe({
                next: (profile: UserProfile) => {
                  localStorage.setItem('session', JSON.stringify(profile));
                  this.isAuthenticated.next(true);
                  this.currentUserRole.next(profile.role);
                  this.currentUser.next(profile);

                  // Set auto logout timer
                  try {
                    const tokenData = JSON.parse(atob(token.split('.')[1]));
                    const expirationTime = tokenData.exp * 1000;
                    this.autoLogoutTimer(expirationTime - Date.now());
                  } catch (e) {
                    this.logout();
                  }
                },
                error: () => {
                  this.logout();
                }
              });
            } else {
              this.logout();
            }
            // Mark as initialized after validation completes
            this.isInitialized.next(true);
          },
          error: () => {
            this.logout();
            // Mark as initialized even after error
            this.isInitialized.next(true);
          }
        });
      } else {
        console.log('🔍 No token or session found');
        // Mark as initialized when no token/session
        this.isInitialized.next(true);
      }
    } else {
      // Mark as initialized when not in browser
      this.isInitialized.next(true);
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

  private getSession(): UserProfile | null {
    if (isPlatformBrowser(this.platformId)) {
      const sessionData = localStorage.getItem('session');
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }

  getCurrentUser(): UserProfile | null {
    return this.getSession();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login/validate`, { username: email, password })
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);

            // Fetch user profile after successful login
            this.fetchUserProfile().subscribe({
              next: (profile: UserProfile) => {
                localStorage.setItem('session', JSON.stringify(profile));
                this.isAuthenticated.next(true);
                this.currentUserRole.next(profile.role);
                this.currentUser.next(profile);

                // Set auto logout timer
                try {
                  const tokenData = JSON.parse(atob(response.token.split('.')[1]));
                  const expirationTime = tokenData.exp * 1000;
                  this.autoLogoutTimer(expirationTime - Date.now());
                } catch (e) {
                  console.error('Error setting auto logout timer:', e);
                }
              },
              error: () => {
                this.logout();
              }
            });
          }
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
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }

  private fetchUserProfile(): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${environment.apiUrl}/secure/user/profile`, {});
  }

  getUserProfile(): Observable<UserProfile> {
    return this.fetchUserProfile();
  }

  private validateToken(): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/secure/validate-token`, {}).pipe(
      map(() => true), // Return true if the request succeeds
      catchError((error) => {
        console.error('Token validation failed:', error);
        return of(false);
      })
    );
  }

  // Public method to check current authentication state
  isCurrentlyAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  // Public method to check if initialization is complete
  isAuthInitialized(): boolean {
    return this.isInitialized.value;
  }
}
