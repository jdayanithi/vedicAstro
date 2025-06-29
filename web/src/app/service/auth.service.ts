import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

interface UserProfile {
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
  private apiUrl = environment.apiUrl;
  
  // Store the URL the user wanted to access before being redirected to login
  redirectUrl: string | null = null;

  // Public observables
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get currentUserRole$(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private googleAuthService: GoogleAuthService
  ) {
    this.checkSession();
  }  private checkSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with server
      this.validateToken().subscribe({
        next: (isValid) => {
          if (isValid) {
            const session = this.getSession();
            if (session) {
              this.isAuthenticated.next(true);
              this.currentUserRole.next(session.role);
            } else {
              // Token is valid but no session data, fetch profile
              this.fetchUserProfile().subscribe({
                next: (profile: UserProfile) => {
                  localStorage.setItem('session', JSON.stringify({
                    userId: profile.userId,
                    email: profile.username,
                    role: profile.role,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    birthDate: profile.birthDate,
                    birthTime: profile.birthTime,
                    birthPlace: profile.birthPlace,
                    userType: profile.userType,
                    zodiacSign: profile.zodiacSign,
                    risingSign: profile.risingSign,
                    moonSign: profile.moonSign,
                    timestamp: new Date()
                  }));
                  this.isAuthenticated.next(true);
                  this.currentUserRole.next(profile.role);
                },
                error: () => {
                  this.clearSession();
                }
              });
            }
          } else {
            this.clearSession();
          }
        },
        error: () => {
          this.clearSession();
        }
      });
    } else {
      // Ensure clean state if no token
      this.isAuthenticated.next(false);
      this.currentUserRole.next(null);
    }
  }

  private validateToken(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/auth/validate-token`).pipe(
      tap(() => true),
      catchError(() => of(false))
    );
  }

  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    this.isAuthenticated.next(true);
    
    // Fetch user profile after storing token
    this.fetchUserProfile().subscribe({
      next: (profile) => {
        localStorage.setItem('session', JSON.stringify({
          userId: profile.userId,
          email: profile.username,
          role: profile.role,
          firstName: profile.firstName,
          lastName: profile.lastName,
          birthDate: profile.birthDate,
          birthTime: profile.birthTime,
          birthPlace: profile.birthPlace,
          userType: profile.userType,
          zodiacSign: profile.zodiacSign,
          risingSign: profile.risingSign,
          moonSign: profile.moonSign,
          timestamp: new Date()
        }));
        this.currentUserRole.next(profile.role);
        
        // Redirect to the originally intended URL or default to landing page
        const redirectTo = this.redirectUrl || '/landing';
        this.redirectUrl = null; // Clear the redirect URL
        this.router.navigate([redirectTo]);
      },
      error: (error) => {
        console.error('Failed to fetch user profile:', error);
        this.clearSession();
      }
    });
  }

  private fetchUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`);
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }  logout(): void {
    // Clear all authentication data first
    this.clearSession();
    
    // Sign out from Google OAuth and reinitialize
    this.googleAuthService.signOut();
    
    // Add a delay to ensure cleanup is complete before reinitializing
    setTimeout(() => {
      this.googleAuthService.reinitialize();
    }, 200);
    
    // Navigate to login after a short delay to ensure state is cleared
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 100);
  }
  clearSession(): void {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Update authentication state
    this.isAuthenticated.next(false);
    this.currentUserRole.next(null);
    
    // Clear redirect URL
    this.redirectUrl = null;
    
    // Clear any cookies (more comprehensive approach)
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
      // Clear for different paths and domains
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    });
  }

  redirectToLogin(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }
  login(email: string, password: string): Observable<any> {
    // Clear any existing session before login
    this.clearSession();
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/validate`, { username: email, password })
      .pipe(
        tap((response: LoginResponse) => {
          this.handleLoginSuccess(response);
        }),
        catchError((error) => {
          // Ensure session is cleared on login failure
          this.clearSession();
          throw error;
        })
      );
  }
  googleLogin(googleToken: string): Observable<any> {
    // Clear any existing session before login
    this.clearSession();
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/google`, { token: googleToken })
      .pipe(
        tap((response: LoginResponse) => {
          this.handleLoginSuccess(response);
        }),
        catchError((error) => {
          // Ensure session is cleared on login failure
          this.clearSession();
          throw error;
        })
      );
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

  getUserProfile(): Observable<UserProfile> {
    return this.fetchUserProfile();
  }
}
