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
  }  private async initializeGoogleSignIn(): Promise<void> {
    if (typeof window !== 'undefined' && window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        console.log('Google Sign-In initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }    } else {
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

        // First try to trigger the Google Sign-In prompt
        try {
          window.google.accounts.id.prompt((notification: any) => {
            console.log('Google prompt notification:', notification);
            
            if (notification.isNotDisplayed()) {
              console.log('Google prompt not displayed, might be due to user interaction requirements');
              subscription.unsubscribe();
              reject(new Error('Google Sign-In prompt was not displayed. Please try clicking the Google Sign-In button directly.'));
            } else if (notification.isSkippedMoment()) {
              console.log('Google prompt was skipped');
              subscription.unsubscribe();
              reject(new Error('Google Sign-In was skipped. Please try again.'));
            }
          });
        } catch (error) {
          console.error('Error triggering Google prompt:', error);
          subscription.unsubscribe();
          reject(new Error('Failed to initialize Google Sign-In. Please try refreshing the page.'));
        }
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
  }  signOut(): void {
    if (typeof window !== 'undefined' && window.google) {
      // Disable auto-select to prevent automatic sign-in
      window.google.accounts.id.disableAutoSelect();
      
      // Cancel any pending prompts
      try {
        window.google.accounts.id.cancel();
      } catch (error) {
        console.log('No pending Google Sign-In prompts to cancel');
      }
    }
    
    // Clear the internal user state
    this.googleUser$.next(null);
    
    console.log('Google OAuth state cleared');
  }

  // Method to re-initialize Google Sign-In (useful after logout)
  reinitialize(): void {
    console.log('Reinitializing Google Sign-In...');
    
    // Clear any existing state
    this.googleUser$.next(null);
    
    // Reinitialize the Google Sign-In
    this.initializeGoogleSignIn();
  }
}
