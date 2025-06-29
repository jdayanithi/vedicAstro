import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    // Add token to all API requests except public login endpoints
    const isPublicLoginEndpoint = request.url.includes('/login/validate') || 
                                 request.url.includes('/login/google') ||
                                 request.url.includes('/register');
    
    if (token && !isPublicLoginEndpoint) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized responses for protected routes (/api)
        if (error.status === 401 && request.url.includes('/api')) {
          // Token expired or invalid - redirect to login
          this.authService.redirectToLogin();
        }
        return throwError(() => error);
      })
    );
  }
}