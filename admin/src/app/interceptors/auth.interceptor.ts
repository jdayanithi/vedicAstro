import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const authService = inject(AuthService);
  
  // Add token to all API requests except public endpoints
  const isPublicEndpoint = req.url.includes('/api/login/') || 
                           req.url.includes('/api/register/') ||
                           req.url.includes('/api/auth/');
  
  // All /api/secure/* and /api/courses/* endpoints require authentication (never public)
  const isSecureEndpoint = req.url.includes('/api/secure/') || req.url.includes('/api/courses/');
  
  if (token && (!isPublicEndpoint || isSecureEndpoint)) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized responses for protected routes (/api)
        if (error.status === 401 && req.url.includes('/api')) {
          // Token expired or invalid - redirect to login
          authService.logout();
          router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 errors even when no token is present for API calls
      if (error.status === 401 && req.url.includes('/api')) {
        authService.logout();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
