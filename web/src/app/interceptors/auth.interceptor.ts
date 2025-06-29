import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, from, switchMap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if this is a public endpoint based on backend SecurityConfig
    const isPublicEndpoint = request.url.includes('/api/login/') || 
                            request.url.includes('/api/register/') ||
                            request.url.includes('/api/auth/');
    
    // All /api/secure/** endpoints require authentication (never public)
    const isSecureEndpoint = request.url.includes('/api/secure/') ;
    
    if (isPublicEndpoint && !isSecureEndpoint) {
      // For public endpoints, proceed without token
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
    }

    // For protected endpoints, get token asynchronously
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        let clonedRequest = request;
        
        if (token) {
          clonedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle 401 Unauthorized responses for protected routes (/api)
            if (error.status === 401 && request.url.includes('/api')) {
              // Token expired or invalid - redirect to login
              this.authService.redirectToLogin();
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}