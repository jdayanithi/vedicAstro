import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from './google-auth.service';
import { environment } from '../../environments/environment';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// Debug flag - set to false in production
const DEBUG_JWT = true;

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

  // Platform detection
  private get isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  // Platform-aware storage methods
  private async setStorageItem(key: string, value: string): Promise<void> {
    try {
      if (DEBUG_JWT) {
        console.log(`[JWT-DEBUG] Setting storage item: ${key} on platform: ${Capacitor.getPlatform()}`);
      }
      
      if (this.isNative) {
        // Use Capacitor Preferences for mobile
        await Preferences.set({
          key: key,
          value: value
        });
        if (DEBUG_JWT) {
          console.log(`[JWT-DEBUG] Successfully stored ${key} via Capacitor Preferences`);
        }
      } else {
        // Use localStorage for web
        localStorage.setItem(key, value);
        if (DEBUG_JWT) {
          console.log(`[JWT-DEBUG] Successfully stored ${key} via localStorage`);
        }
      }
    } catch (error) {
      console.error(`[JWT-DEBUG] Failed to set storage item ${key}:`, error);
    }
  }

  private async getStorageItem(key: string): Promise<string | null> {
    try {
      if (DEBUG_JWT) {
        console.log(`[JWT-DEBUG] Getting storage item: ${key} on platform: ${Capacitor.getPlatform()}`);
      }
      
      if (this.isNative) {
        // Use Capacitor Preferences for mobile
        const result = await Preferences.get({ key: key });
        if (DEBUG_JWT) {
          console.log(`[JWT-DEBUG] Retrieved ${key} via Capacitor Preferences:`, result.value ? 'found' : 'not found');
        }
        return result.value;
      } else {
        // Use localStorage for web
        const value = localStorage.getItem(key);
        if (DEBUG_JWT) {
          console.log(`[JWT-DEBUG] Retrieved ${key} via localStorage:`, value ? 'found' : 'not found');
        }
        return value;
      }
    } catch (error) {
      console.error(`[JWT-DEBUG] Failed to get storage item ${key}:`, error);
      return null;
    }
  }

  private async removeStorageItem(key: string): Promise<void> {
    try {
      if (this.isNative) {
        // Use Capacitor Preferences for mobile
        await Preferences.remove({ key: key });
      } else {
        // Use localStorage for web
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Failed to remove storage item ${key}:`, error);
    }
  }

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
    // Use setTimeout to ensure constructor completes before async operations
    setTimeout(() => {
      this.checkSession();
    }, 0);
  }  private checkSession(): void {
    // Add delay for mobile platforms to ensure storage is ready
    const checkDelay = this.isNative ? 100 : 0;
    
    setTimeout(async () => {
      const token = await this.getStorageItem('token');
      if (token) {
        // Validate token with server
        this.validateToken().subscribe({
          next: (isValid) => {
            if (isValid) {
              this.getStorageItem('session').then(sessionData => {
                if (sessionData) {
                  const session = JSON.parse(sessionData);
                  this.isAuthenticated.next(true);
                  this.currentUserRole.next(session.role);
                } else {
                  // Token is valid but no session data, fetch profile
                  this.fetchUserProfile().subscribe({
                    next: (profile: UserProfile) => {
                      const sessionData = JSON.stringify({
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
                      });
                      this.setStorageItem('session', sessionData);
                      this.isAuthenticated.next(true);
                      this.currentUserRole.next(profile.role);
                    },
                    error: () => {
                      this.clearSession();
                    }
                  });
                }
              });
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
    }, checkDelay);
  }

  private validateToken(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/auth/validate-token`).pipe(
      tap(() => true),
      catchError(() => of(false))
    );
  }

  private async handleLoginSuccess(response: LoginResponse): Promise<void> {
    try {
      if (DEBUG_JWT) {
        console.log(`[JWT-DEBUG] Handling login success on platform: ${Capacitor.getPlatform()}`);
        console.log(`[JWT-DEBUG] Received token length:`, response.token?.length || 0);
      }
      
      // Store token using platform-aware storage
      await this.setStorageItem('token', response.token);
      this.isAuthenticated.next(true);
      
      // Fetch user profile after storing token
      this.fetchUserProfile().subscribe({
        next: async (profile) => {
          if (DEBUG_JWT) {
            console.log(`[JWT-DEBUG] Fetched user profile:`, profile.username);
          }
          
          const sessionData = JSON.stringify({
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
          });
          
          await this.setStorageItem('session', sessionData);
          this.currentUserRole.next(profile.role);
          
          if (DEBUG_JWT) {
            console.log(`[JWT-DEBUG] Login success complete. Redirecting...`);
          }
          
          // Redirect to the originally intended URL or default to landing page
          const redirectTo = this.redirectUrl || '/landing';
          this.redirectUrl = null; // Clear the redirect URL
          this.router.navigate([redirectTo]);
        },
        error: (error) => {
          console.error('[JWT-DEBUG] Failed to fetch user profile:', error);
          this.clearSession();
        }
      });
    } catch (error) {
      console.error('[JWT-DEBUG] Error handling login success:', error);
      this.clearSession();
    }
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
  async clearSession(): Promise<void> {
    try {
      // Clear platform-aware storage
      await this.removeStorageItem('token');
      await this.removeStorageItem('session');
      
      // Also clear localStorage for web fallback
      if (!this.isNative) {
        localStorage.removeItem('token');
        localStorage.removeItem('session');
        sessionStorage.clear();
        
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
      
      // Update authentication state
      this.isAuthenticated.next(false);
      this.currentUserRole.next(null);
      
      // Clear redirect URL
      this.redirectUrl = null;
    } catch (error) {
      console.error('Error clearing session:', error);
      // Force clear state even if storage clearing fails
      this.isAuthenticated.next(false);
      this.currentUserRole.next(null);
      this.redirectUrl = null;
    }
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
        tap(async (response: LoginResponse) => {
          await this.handleLoginSuccess(response);
        }),
        catchError((error) => {
          // Ensure session is cleared on login failure
          this.clearSession();
          return throwError(() => error);
        })
      );
  }

  googleLogin(googleToken: string): Observable<any> {
    // Clear any existing session before login
    this.clearSession();
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/google`, { token: googleToken })
      .pipe(
        tap(async (response: LoginResponse) => {
          await this.handleLoginSuccess(response);
        }),
        catchError((error) => {
          // Ensure session is cleared on login failure
          this.clearSession();
          return throwError(() => error);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  async isAdmin(): Promise<boolean> {
    try {
      const session = await this.getSession();
      return session?.role === 'Admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Synchronous version for backwards compatibility
  isAdminSync(): boolean {
    if (this.isNative) {
      console.warn('isAdminSync() called on mobile platform. Use isAdmin() instead.');
      return false;
    }
    const session = this.getSessionSync();
    return session?.role === 'Admin';
  }

  async getSession(): Promise<any> {
    try {
      const session = await this.getStorageItem('session');
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await this.getStorageItem('token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Synchronous versions for backwards compatibility
  getSessionSync(): any {
    if (this.isNative) {
      console.warn('getSessionSync() called on mobile platform. Use getSession() instead.');
      return null;
    }
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
  }

  getTokenSync(): string | null {
    if (this.isNative) {
      console.warn('getTokenSync() called on mobile platform. Use getToken() instead.');
      return null;
    }
    return localStorage.getItem('token');
  }

  getUserProfile(): Observable<UserProfile> {
    return this.fetchUserProfile();
  }
}
