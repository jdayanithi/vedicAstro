import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    google?: any;
  }
}

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
  credential: string; // JWT token
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private googleUser$ = new Subject<GoogleUser | null>();

  constructor() {
    this.initializeGoogleSignIn();
  }
  private async initializeGoogleSignIn(): Promise<void> {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    } else {
      // Retry after a short delay if google library is not loaded yet
      setTimeout(() => this.initializeGoogleSignIn(), 100);
    }
  }
  private handleCredentialResponse(response: any): void {
    if (response.credential) {
      // Decode the JWT token to get user information
      const payload = this.decodeJwtResponse(response.credential);
      const googleUser: GoogleUser = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        sub: payload.sub,
        credential: response.credential
      };
      this.googleUser$.next(googleUser);
    }
  }

  private decodeJwtResponse(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  signIn(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.google) {
        // Create a one-time subscription
        const subscription = this.googleUser$.subscribe({
          next: (user) => {
            if (user) {
              subscription.unsubscribe();
              resolve(user);
            }
          },
          error: (error) => {
            subscription.unsubscribe();
            reject(error);
          }
        });

        // Trigger the Google Sign-In prompt
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            subscription.unsubscribe();
            reject(new Error('Google Sign-In prompt was not displayed or was skipped'));
          }
        });
      } else {
        reject(new Error('Google Sign-In library not loaded'));
      }
    });
  }

  renderButton(element: HTMLElement): void {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'continue_with'
      });
    }
  }

  signOut(): void {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    this.googleUser$.next(null);
  }
}
