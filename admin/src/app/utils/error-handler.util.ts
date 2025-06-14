/**
 * Centralized error handling utility for extracting and formatting backend error messages
 */
export class ErrorHandlerUtil {
  
  /**
   * Extracts a user-friendly error message from various error response formats
   * @param error - The error object from HTTP requests
   * @param defaultMessage - Default message to show if no specific error is found
   * @returns A user-friendly error message string
   */
  static extractErrorMessage(error: any, defaultMessage: string = 'An error occurred. Please try again.'): string {
    if (!error) {
      return defaultMessage;
    }

    // Check for backend validation errors with field-specific messages
    if (error.error && error.error.fieldErrors) {
      // Extract field validation errors from backend GlobalExceptionHandler
      const fieldErrors = error.error.fieldErrors;
      const errorMessages = Object.entries(fieldErrors)
        .map(([field, message]) => `${field}: ${message}`)
        .join(', ');
      return errorMessages || error.error.message || defaultMessage;
    }

    // Check for standard backend error response format
    if (error.error && error.error.message) {
      return error.error.message;
    }

    // Check for direct error message in response
    if (error.error && typeof error.error === 'string') {
      return error.error;
    }

    // Check for error property directly
    if (error.error && error.error.error) {
      return error.error.error;
    }

    // Check for message property directly on error object
    if (error.message) {
      return error.message;
    }

    // Handle HTTP status code specific errors
    if (error.status) {
      switch (error.status) {
        case 400:
          return error.error?.message || 'Invalid request. Please check your input data.';
        case 401:
          return 'Authentication failed. Please log in again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 409:
          return error.error?.message || 'A conflict occurred. The resource may already exist.';
        case 422:
          return error.error?.message || 'Validation failed. Please check your input data.';
        case 500:
          return error.error?.message || 'Server error. Please try again later.';
        case 0:
          return 'Unable to connect to the server. Please check your internet connection.';
        default:
          return error.error?.message || `Server error (${error.status}). Please try again later.`;
      }
    }

    return defaultMessage;
  }

  /**
   * Formats validation errors for display
   * @param fieldErrors - Object containing field validation errors
   * @returns Formatted error message string
   */
  static formatValidationErrors(fieldErrors: Record<string, string>): string {
    if (!fieldErrors || typeof fieldErrors !== 'object') {
      return 'Validation failed. Please check your input data.';
    }

    const errorMessages = Object.entries(fieldErrors)
      .map(([field, message]) => {
        // Format field names to be more user-friendly
        const friendlyFieldName = field
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        return `${friendlyFieldName}: ${message}`;
      });

    return errorMessages.length === 1 
      ? errorMessages[0] 
      : `Multiple validation errors: ${errorMessages.join('; ')}`;
  }

  /**
   * Determines if an error is a validation error
   * @param error - The error object
   * @returns True if it's a validation error
   */
  static isValidationError(error: any): boolean {
    return error?.error?.fieldErrors || 
           error?.status === 400 || 
           error?.status === 422 ||
           (error?.error?.message && error.error.message.toLowerCase().includes('validation'));
  }

  /**
   * Determines if an error is a conflict error (e.g., duplicate entry)
   * @param error - The error object
   * @returns True if it's a conflict error
   */
  static isConflictError(error: any): boolean {
    return error?.status === 409 ||
           (error?.error?.message && 
            (error.error.message.toLowerCase().includes('duplicate') ||
             error.error.message.toLowerCase().includes('already exists') ||
             error.error.message.toLowerCase().includes('conflict')));
  }

  /**
   * Gets the appropriate snackbar panel class based on error type
   * @param error - The error object
   * @returns CSS class name for snackbar styling
   */
  static getSnackbarClass(error: any): string[] {
    if (this.isValidationError(error)) {
      return ['warning-snackbar'];
    }
    if (this.isConflictError(error)) {
      return ['warning-snackbar'];
    }
    return ['error-snackbar'];
  }
}
