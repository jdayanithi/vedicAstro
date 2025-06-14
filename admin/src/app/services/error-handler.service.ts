import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerUtil } from '../utils/error-handler.util';

/**
 * Injectable service for handling errors consistently across the application
 * This service uses the ErrorHandlerUtil for message extraction and provides
 * convenient methods for showing error messages with proper styling
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private snackBar = inject(MatSnackBar);

  /**
   * Shows an error message using MatSnackBar with appropriate styling
   * @param error - The error object from HTTP requests or other sources
   * @param defaultMessage - Default message if no specific error can be extracted
   * @param duration - Duration to show the snackbar (default: 5000ms)
   */
  showError(error: any, defaultMessage: string = 'An error occurred. Please try again.', duration: number = 5000): void {
    const errorMessage = ErrorHandlerUtil.extractErrorMessage(error, defaultMessage);
    const panelClass = ErrorHandlerUtil.getSnackbarClass(error);
    
    this.snackBar.open(errorMessage, 'Close', {
      duration,
      panelClass
    });
  }

  /**
   * Shows a success message using MatSnackBar
   * @param message - Success message to display
   * @param duration - Duration to show the snackbar (default: 3000ms)
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['success-snackbar']
    });
  }

  /**
   * Shows a warning message using MatSnackBar
   * @param message - Warning message to display
   * @param duration - Duration to show the snackbar (default: 4000ms)
   */
  showWarning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['warning-snackbar']
    });
  }

  /**
   * Shows an info message using MatSnackBar
   * @param message - Info message to display
   * @param duration - Duration to show the snackbar (default: 3000ms)
   */
  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['info-snackbar']
    });
  }

  /**
   * Handles API errors with specific patterns for common scenarios
   * @param error - The error object
   * @param context - Context about what operation failed (e.g., 'saving lesson')
   * @param duration - Duration to show the snackbar
   */
  handleApiError(error: any, context: string = 'operation', duration: number = 5000): void {
    let defaultMessage = `Error ${context}. Please try again.`;
    
    // Handle specific error scenarios
    if (ErrorHandlerUtil.isValidationError(error)) {
      defaultMessage = `Validation failed while ${context}. Please check your input data.`;
    } else if (ErrorHandlerUtil.isConflictError(error)) {
      defaultMessage = `A conflict occurred while ${context}. The resource may already exist.`;
    } else if (error?.status === 404) {
      defaultMessage = `Resource not found while ${context}.`;
    } else if (error?.status === 403) {
      defaultMessage = `You do not have permission to perform this ${context}.`;
    } else if (error?.status === 401) {
      defaultMessage = `Authentication required to ${context}. Please log in again.`;
    }

    this.showError(error, defaultMessage, duration);
  }

  /**
   * Handles form validation errors specifically
   * @param error - The error object
   * @param formContext - Context about what form failed (e.g., 'lesson form')
   */
  handleFormError(error: any, formContext: string = 'form'): void {
    if (ErrorHandlerUtil.isValidationError(error) && error?.error?.fieldErrors) {
      const validationMessage = ErrorHandlerUtil.formatValidationErrors(error.error.fieldErrors);
      this.showWarning(validationMessage, 6000);
    } else {
      this.handleApiError(error, `submitting ${formContext}`);
    }
  }

  /**
   * Logs error details to console for debugging
   * @param error - The error object
   * @param context - Context about where the error occurred
   */
  logError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
    
    // Log additional details for debugging
    if (error?.error) {
      console.error('Error details:', error.error);
    }
    if (error?.status) {
      console.error('HTTP Status:', error.status);
    }
    if (error?.message) {
      console.error('Error message:', error.message);
    }
  }
}
