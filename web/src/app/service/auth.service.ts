import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  role: 'Admin' | 'Viewer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string | null>(null);

  // Hardcoded credentials
  private readonly USERS: User[] = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'Admin'
    },
    {
      email: 'viewer@example.com',
      password: 'viewer123',
      role: 'Viewer'
    }
  ];

  constructor(private router: Router) {
    // Check if session exists on service initialization
    this.checkSession();
  }

  private checkSession(): void {
    const session = localStorage.getItem('session');
    if (session) {
      this.isAuthenticated.next(true);
      const parsedSession = JSON.parse(session);
      this.currentUserRole.next(parsedSession.role);
    }
  }

  login(email: string, password: string): boolean {
    const user = this.USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('session', JSON.stringify({
        email: user.email,
        role: user.role,
        timestamp: new Date()
      }));
      this.isAuthenticated.next(true);
      this.currentUserRole.next(user.role);
      return true;
    }
    return false;
  }

  logout(): void {
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
}
