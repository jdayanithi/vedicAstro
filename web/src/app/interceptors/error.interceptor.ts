import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { NetworkStatusService } from '../service/network-status.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private networkStatus: NetworkStatusService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred. Please try again.';
          // Handle different types of errors
        if (error.status === 0) {
          // Network error or server not running
          errorMessage = this.networkStatus.getConnectionErrorMessage();
        } else if (error.status === 401) {
          // Don't show dialog for 401 errors, let the component handle it
          return throwError(() => error);
        } else if (error.status === 403) {
          errorMessage = 'Access denied. You do not have permission to perform this action.';
        } else if (error.status === 404) {
          errorMessage = 'The requested resource was not found.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        // For specific routes like login, let the component handle the error
        if (request.url.includes('/login/validate') || request.url.includes('/register')) {
          return throwError(() => error);
        }

        // Show error dialog for other requests
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          data: { message: errorMessage }
        });

        return throwError(() => error);
      })
    );
  }
}
