package com.vedicastrology.config;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.validation.ConstraintViolationException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;
    
    // Standard error response structure
    private Map<String, Object> createErrorResponse(String error, String message, HttpStatus status, String errorCode) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", error);
        errorResponse.put("message", message);
        errorResponse.put("status", status.value());
        errorResponse.put("timestamp", System.currentTimeMillis());
        errorResponse.put("errorCode", errorCode);
        
        // Generate unique error ID for tracking (never expose in production logs)
        String errorId = UUID.randomUUID().toString().substring(0, 8);
        errorResponse.put("errorId", errorId);
        
        return errorResponse;
    }
    
    // Log error securely without exposing sensitive information
    private void logError(String errorId, String operation, Exception ex, String userMessage) {
        if (isProductionProfile()) {
            // Production: Log minimal information
            logger.error("🚨 Error ID: {} | Operation: {} | Type: {} | User Message: {}", 
                        errorId, operation, ex.getClass().getSimpleName(), userMessage);
        } else {
            // Development: Log full details
            logger.error("🚨 Error ID: {} | Operation: {} | Exception: {}", 
                        errorId, operation, ex.getMessage(), ex);
        }
    }
    
    private boolean isProductionProfile() {
        return "prod".equals(activeProfile) || "production".equals(activeProfile);
    }

    // HTTP Message Not Readable (malformed JSON, etc.)
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        
        String userMessage = "Invalid request format. Please check your request data.";
        String errorCode = "INVALID_REQUEST_FORMAT";
        
        // Check for specific enum validation errors
        if (ex.getCause() instanceof InvalidFormatException) {
            InvalidFormatException formatEx = (InvalidFormatException) ex.getCause();
            if (formatEx.getTargetType().isEnum()) {
                String fieldName = getFieldName(formatEx);
                Object[] enumValues = formatEx.getTargetType().getEnumConstants();
                StringBuilder validValues = new StringBuilder();
                for (Object enumValue : enumValues) {
                    if (validValues.length() > 0) validValues.append(", ");
                    validValues.append(enumValue.toString());
                }
                userMessage = String.format("Invalid value for field '%s'. Valid values are: [%s]", 
                    fieldName, validValues.toString());
                errorCode = "INVALID_ENUM_VALUE";
            }
        }
        
        Map<String, Object> errorResponse = createErrorResponse(
            "Bad Request", userMessage, HttpStatus.BAD_REQUEST, errorCode);
        
        logError(errorResponse.get("errorId").toString(), "HTTP_MESSAGE_NOT_READABLE", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Validation errors (Bean Validation)
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        Map<String, Object> errorResponse = createErrorResponse(
            "Validation Failed", "Invalid input data provided", HttpStatus.BAD_REQUEST, "VALIDATION_FAILED");
        
        // Add field-specific validation errors (safe to expose)
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            fieldErrors.put(error.getField(), error.getDefaultMessage())
        );
        errorResponse.put("fieldErrors", fieldErrors);
        
        logError(errorResponse.get("errorId").toString(), "VALIDATION_ERROR", ex, "Field validation failed");
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Type mismatch errors (wrong parameter types)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> handleTypeMismatchException(
            MethodArgumentTypeMismatchException ex) {
        
        String userMessage = String.format("Invalid value for parameter '%s'. Expected type: %s", 
            ex.getName(), ex.getRequiredType().getSimpleName());
        
        Map<String, Object> errorResponse = createErrorResponse(
            "Invalid Parameter", userMessage, HttpStatus.BAD_REQUEST, "TYPE_MISMATCH");
        
        logError(errorResponse.get("errorId").toString(), "TYPE_MISMATCH", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // File upload size exceeded
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxSizeException(
            MaxUploadSizeExceededException ex) {
        
        String userMessage = "File size exceeds maximum allowed limit";
        Map<String, Object> errorResponse = createErrorResponse(
            "File Too Large", userMessage, HttpStatus.PAYLOAD_TOO_LARGE, "FILE_SIZE_EXCEEDED");
        
        logError(errorResponse.get("errorId").toString(), "FILE_SIZE_EXCEEDED", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    // Authentication errors
    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ResponseEntity<Map<String, Object>> handleAuthenticationException(
            AuthenticationException ex) {
        
        String userMessage = "Invalid credentials provided";
        Map<String, Object> errorResponse = createErrorResponse(
            "Authentication Failed", userMessage, HttpStatus.UNAUTHORIZED, "AUTH_FAILED");
        
        logError(errorResponse.get("errorId").toString(), "AUTHENTICATION_FAILED", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    // Authorization errors
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDeniedException(
            AccessDeniedException ex) {
        
        String userMessage = "You don't have permission to access this resource";
        Map<String, Object> errorResponse = createErrorResponse(
            "Access Denied", userMessage, HttpStatus.FORBIDDEN, "ACCESS_DENIED");
        
        logError(errorResponse.get("errorId").toString(), "ACCESS_DENIED", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    // Database constraint violations
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(
            DataIntegrityViolationException ex) {
        
        String userMessage = "Operation violates data integrity constraints";
        Map<String, Object> errorResponse = createErrorResponse(
            "Data Conflict", userMessage, HttpStatus.CONFLICT, "DATA_INTEGRITY_VIOLATION");
        
        logError(errorResponse.get("errorId").toString(), "DATA_INTEGRITY_VIOLATION", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    // Database access errors
    @ExceptionHandler({DataAccessException.class, SQLException.class})
    public ResponseEntity<Map<String, Object>> handleDatabaseException(
            Exception ex) {
        
        String userMessage = "A database error occurred. Please try again later.";
        Map<String, Object> errorResponse = createErrorResponse(
            "Database Error", userMessage, HttpStatus.INTERNAL_SERVER_ERROR, "DATABASE_ERROR");
        
        logError(errorResponse.get("errorId").toString(), "DATABASE_ERROR", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Validation constraint violations
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolationException(
            ConstraintViolationException ex) {
        
        String userMessage = "Input validation failed";
        Map<String, Object> errorResponse = createErrorResponse(
            "Validation Error", userMessage, HttpStatus.BAD_REQUEST, "CONSTRAINT_VIOLATION");
        
        logError(errorResponse.get("errorId").toString(), "CONSTRAINT_VIOLATION", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // File I/O errors
    @ExceptionHandler(IOException.class)
    public ResponseEntity<Map<String, Object>> handleIOException(
            IOException ex) {
        
        String userMessage = "File operation failed. Please try again.";
        Map<String, Object> errorResponse = createErrorResponse(
            "File Operation Error", userMessage, HttpStatus.INTERNAL_SERVER_ERROR, "IO_ERROR");
        
        logError(errorResponse.get("errorId").toString(), "IO_ERROR", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Business logic errors (IllegalArgumentException)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(
            IllegalArgumentException ex) {
        
        // For IllegalArgumentException, the message is usually safe to expose
        String userMessage = ex.getMessage();
        if (userMessage == null || userMessage.isEmpty()) {
            userMessage = "Invalid argument provided";
        }
        
        Map<String, Object> errorResponse = createErrorResponse(
            "Invalid Argument", userMessage, HttpStatus.BAD_REQUEST, "INVALID_ARGUMENT");
        
        logError(errorResponse.get("errorId").toString(), "ILLEGAL_ARGUMENT", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Security exceptions
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Map<String, Object>> handleSecurityException(
            SecurityException ex) {
        
        String userMessage = "Security violation detected";
        Map<String, Object> errorResponse = createErrorResponse(
            "Security Error", userMessage, HttpStatus.FORBIDDEN, "SECURITY_VIOLATION");
        
        logError(errorResponse.get("errorId").toString(), "SECURITY_VIOLATION", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    // Runtime exceptions (catch-all for unexpected runtime errors)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(
            RuntimeException ex) {
        
        String userMessage = "An unexpected error occurred. Please try again later.";
        
        // In development, we can be more specific
        if (!isProductionProfile() && ex.getMessage() != null) {
            userMessage = "Runtime error: " + ex.getMessage();
        }
        
        Map<String, Object> errorResponse = createErrorResponse(
            "Runtime Error", userMessage, HttpStatus.INTERNAL_SERVER_ERROR, "RUNTIME_ERROR");
        
        logError(errorResponse.get("errorId").toString(), "RUNTIME_ERROR", ex, userMessage);
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Generic exception handler (last resort)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(
            Exception ex, WebRequest request) {
        
        String userMessage = "An internal server error occurred. Please contact support if the problem persists.";
        
        Map<String, Object> errorResponse = createErrorResponse(
            "Internal Server Error", userMessage, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR");
        
        logError(errorResponse.get("errorId").toString(), "GENERIC_EXCEPTION", ex, userMessage);
        
        // In production, log additional context securely
        if (isProductionProfile()) {
            logger.error("🚨 CRITICAL ERROR - Error ID: {} | Request URI: {} | User Agent: {}", 
                        errorResponse.get("errorId"), 
                        request.getDescription(false),
                        request.getHeader("User-Agent"));
        }
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Helper method to extract field name from JsonMappingException
    private String getFieldName(JsonMappingException ex) {
        if (ex.getPath() != null && !ex.getPath().isEmpty()) {
            return ex.getPath().get(ex.getPath().size() - 1).getFieldName();
        }
        return "unknown";
    }
}