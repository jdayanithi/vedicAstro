import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private isOnline$ = new BehaviorSubject<boolean>(navigator.onLine);
  private hasCheckedInitialConnectivity = false;

  constructor(private http: HttpClient) {
    // Listen for online/offline events
    merge(
      fromEvent(window, 'online').pipe(map(() => {
        // When browser detects online, verify with actual connectivity check
        this.checkInternetConnectivity();
        return true; // Return true optimistically for immediate feedback
      })),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).subscribe(isOnline => {
      if (typeof isOnline === 'boolean') {
        this.isOnline$.next(isOnline);
        console.log('Network status changed:', isOnline ? 'ONLINE' : 'OFFLINE');
      }
    });

    // Perform initial connectivity check
    this.performInitialConnectivityCheck();
  }

  get isOnline(): Observable<boolean> {
    return this.isOnline$.asObservable();
  }

  get isOnlineValue(): boolean {
    return this.isOnline$.value;
  }

  private async performInitialConnectivityCheck(): Promise<void> {
    if (this.hasCheckedInitialConnectivity) return;
    
    console.log('Starting initial connectivity check...');
    try {
      // Test actual internet connectivity, not just network interface status
      const isConnected = await this.checkInternetConnectivity();
      console.log('Initial connectivity check completed:', isConnected ? 'CONNECTED' : 'DISCONNECTED');
      this.hasCheckedInitialConnectivity = true;
    } catch (error) {
      console.warn('Initial connectivity check failed:', error);
      this.isOnline$.next(false);
      this.hasCheckedInitialConnectivity = true;
    }
  }

  async checkInternetConnectivity(): Promise<boolean> {
    try {
      // Try multiple endpoints to ensure robust connectivity checking
      const endpoints = [
        '/favicon.ico',
        '/', // Try the main page
        window.location.origin // Try the current origin
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'HEAD',
            cache: 'no-cache',
            signal: AbortSignal.timeout(3000) // 3 second timeout per endpoint
          });
          
          if (response.ok) {
            this.isOnline$.next(true);
            console.log('Internet connectivity check result: CONNECTED (via', endpoint, ')');
            return true;
          }
        } catch (endpointError) {
          console.log('Failed to connect to endpoint:', endpoint, endpointError);
          continue; // Try next endpoint
        }
      }
      
      // All endpoints failed
      this.isOnline$.next(false);
      console.log('Internet connectivity check result: DISCONNECTED (all endpoints failed)');
      return false;
    } catch (error) {
      console.warn('Internet connectivity check failed:', error);
      this.isOnline$.next(false);
      return false;
    }
  }

  async retryConnection(): Promise<boolean> {
    console.log('Retrying connection...');
    return await this.checkInternetConnectivity();
  }

  // Public method to force a connectivity check
  async forceConnectivityCheck(): Promise<boolean> {
    return await this.checkInternetConnectivity();
  }

  getConnectionErrorMessage(): string {
    if (!this.isOnlineValue) {
      return 'You appear to be offline. Please check your internet connection and try again.';
    }
    return 'Unable to connect to the server. Please ensure the server is running and try again.';
  }

  getOfflineCapabilities(): string[] {
    return [
      'Browse previously loaded course content',
      'Read cached astrology information',
      'Access app settings',
      'View offline-available features'
    ];
  }

  getOfflineLimitations(): string[] {
    return [
      'Cannot load new content',
      'Cannot sync progress',
      'Cannot login or register',
      'Cannot access real-time data'
    ];
  }
}
