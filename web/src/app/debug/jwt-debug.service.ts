import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class JwtDebugService {

  constructor() {}

  async debugStorageState(): Promise<void> {
    console.log('=== JWT Debug Information ===');
    console.log('Platform:', Capacitor.getPlatform());
    console.log('Is Native Platform:', Capacitor.isNativePlatform());
    
    try {
      // Check localStorage (web)
      if (!Capacitor.isNativePlatform()) {
        console.log('localStorage token:', localStorage.getItem('token'));
        console.log('localStorage session:', localStorage.getItem('session'));
      }

      // Check Capacitor Preferences (mobile)
      if (Capacitor.isNativePlatform()) {
        const tokenResult = await Preferences.get({ key: 'token' });
        const sessionResult = await Preferences.get({ key: 'session' });
        console.log('Capacitor Preferences token:', tokenResult.value);
        console.log('Capacitor Preferences session:', sessionResult.value);
      }

      // Check all keys in Preferences
      const allKeys = await Preferences.keys();
      console.log('All storage keys:', allKeys);

    } catch (error) {
      console.error('Error during storage debug:', error);
    }
  }

  async clearAllStorage(): Promise<void> {
    console.log('=== Clearing All Storage ===');
    
    try {
      // Clear localStorage (web)
      if (!Capacitor.isNativePlatform()) {
        localStorage.clear();
        sessionStorage.clear();
        console.log('localStorage and sessionStorage cleared');
      }

      // Clear Capacitor Preferences (mobile)
      if (Capacitor.isNativePlatform()) {
        await Preferences.clear();
        console.log('Capacitor Preferences cleared');
      }

    } catch (error) {
      console.error('Error during storage clear:', error);
    }
  }

  async testTokenStorage(): Promise<void> {
    console.log('=== Testing Token Storage ===');
    
    const testToken = 'test-jwt-token-' + Date.now();
    const testSession = JSON.stringify({
      userId: 123,
      username: 'test@example.com',
      role: 'User',
      firstName: 'Test',
      lastName: 'User'
    });

    try {
      // Test storage
      if (Capacitor.isNativePlatform()) {
        await Preferences.set({ key: 'token', value: testToken });
        await Preferences.set({ key: 'session', value: testSession });
        console.log('Test data stored via Capacitor Preferences');
      } else {
        localStorage.setItem('token', testToken);
        localStorage.setItem('session', testSession);
        console.log('Test data stored via localStorage');
      }

      // Test retrieval
      if (Capacitor.isNativePlatform()) {
        const retrievedToken = await Preferences.get({ key: 'token' });
        const retrievedSession = await Preferences.get({ key: 'session' });
        console.log('Retrieved token:', retrievedToken.value);
        console.log('Retrieved session:', retrievedSession.value);
      } else {
        const retrievedToken = localStorage.getItem('token');
        const retrievedSession = localStorage.getItem('session');
        console.log('Retrieved token:', retrievedToken);
        console.log('Retrieved session:', retrievedSession);
      }

    } catch (error) {
      console.error('Error during token storage test:', error);
    }
  }

  logNetworkRequest(url: string, token: string | null): void {
    console.log('=== Network Request Debug ===');
    console.log('URL:', url);
    console.log('Token:', token ? `${token.substring(0, 20)}...` : 'No token');
    console.log('Platform:', Capacitor.getPlatform());
  }
}
