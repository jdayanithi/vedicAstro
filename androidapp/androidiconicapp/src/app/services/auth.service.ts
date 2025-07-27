import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  subscriptionType: 'free' | 'premium' | 'lifetime';
  purchasedConcepts: string[];
  loginTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private readonly STORAGE_KEY = 'astrology_user';
  private readonly LOGIN_EXPIRY_DAYS = 30; // Keep login for 30 days

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        // Check if login is still valid (within 30 days)
        const loginTime = userData.loginTime || 0;
        const currentTime = Date.now();
        const daysDiff = (currentTime - loginTime) / (1000 * 60 * 60 * 24);
        
        if (daysDiff <= this.LOGIN_EXPIRY_DAYS) {
          this.currentUserSubject.next(userData);
        } else {
          this.logout(); // Auto logout if expired
        }
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  }

  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    // Simulate API call - replace with actual authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock login validation
        if (email && password.length >= 6) {
          const user: User = {
            id: 'user_' + Date.now(),
            email: email,
            name: email.split('@')[0],
            phoneNumber: '',
            subscriptionType: 'free',
            purchasedConcepts: [],
            loginTime: Date.now()
          };
          
          this.currentUserSubject.next(user);
          this.saveUserToStorage(user);
          
          resolve({
            success: true,
            message: 'Login successful',
            user: user
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
  }): Promise<{ success: boolean; message: string; user?: User }> {
    // Simulate API call - replace with actual registration
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userData.email && userData.password.length >= 6 && userData.name) {
          const user: User = {
            id: 'user_' + Date.now(),
            email: userData.email,
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            subscriptionType: 'free',
            purchasedConcepts: [],
            loginTime: Date.now()
          };
          
          this.currentUserSubject.next(user);
          this.saveUserToStorage(user);
          
          resolve({
            success: true,
            message: 'Registration successful',
            user: user
          });
        } else {
          resolve({
            success: false,
            message: 'Please provide valid registration details'
          });
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(updatedUser: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      this.currentUserSubject.next(newUser);
      this.saveUserToStorage(newUser);
    }
  }

  purchaseConcept(conceptId: string): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser && !currentUser.purchasedConcepts.includes(conceptId)) {
      const updatedConcepts = [...currentUser.purchasedConcepts, conceptId];
      this.updateUser({ purchasedConcepts: updatedConcepts });
    }
  }

  hasAccessToConcept(conceptId: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    
    return user.subscriptionType === 'premium' || 
           user.subscriptionType === 'lifetime' || 
           user.purchasedConcepts.includes(conceptId);
  }
}
