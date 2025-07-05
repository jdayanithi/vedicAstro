package com.vedicastrology.service;

import com.vedicastrology.config.LoggingConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Structured logging service for different types of events
 */
@Service
public class StructuredLoggingService {

    // Dedicated loggers for different types of events
    private static final Logger securityLogger = LoggerFactory.getLogger("com.vedicastrology.security");
    private static final Logger performanceLogger = LoggerFactory.getLogger("com.vedicastrology.aop.PerformanceLoggingAspect");
    private static final Logger dosProtectionLogger = LoggerFactory.getLogger("com.vedicastrology.security.DosProtectionService");
    private static final Logger loginHistoryLogger = LoggerFactory.getLogger("com.vedicastrology.service.LoginHistoryService");
    
    @Autowired
    private LoggingConfiguration loggingConfig;

    /**
     * Log security events
     */
    public void logSecurityEvent(String eventType, String username, String ipAddress, String details) {
        if (loggingConfig.getSecurity().isEnabled()) {
            String logEntry = String.format("[SECURITY] %s | Type: %s | User: %s | IP: %s | Details: %s", 
                getCurrentTimestamp(), eventType, username, ipAddress, details);
            securityLogger.warn(logEntry);
        }
    }

    /**
     * Log suspicious activity
     */
    public void logSuspiciousActivity(String activityType, String username, String ipAddress, String userAgent, String reason) {
        if (loggingConfig.getSecurity().isEnabled()) {
            String logEntry = String.format("[SUSPICIOUS_ACTIVITY] %s | Type: %s | User: %s | IP: %s | UserAgent: %s | Reason: %s", 
                getCurrentTimestamp(), activityType, username, ipAddress, userAgent, reason);
            securityLogger.error(logEntry);
        }
    }

    /**
     * Log performance events
     */
    public void logPerformanceEvent(String method, long executionTimeMs, String requestInfo) {
        if (loggingConfig.getPerformance().isEnabled()) {
            String logEntry = String.format("[PERFORMANCE] %s | Method: %s | ExecutionTime: %dms | Request: %s", 
                getCurrentTimestamp(), method, executionTimeMs, requestInfo);
            
            if (executionTimeMs > 1000) {
                performanceLogger.warn(logEntry);
            } else {
                performanceLogger.info(logEntry);
            }
        }
    }

    /**
     * Log DoS protection events
     */
    public void logDosProtectionEvent(String eventType, String ipAddress, String username, String userAgent, String details) {
        if (loggingConfig.getDosProtection().isEnabled()) {
            String logEntry = String.format("[DOS_PROTECTION] %s | Type: %s | IP: %s | User: %s | UserAgent: %s | Details: %s", 
                getCurrentTimestamp(), eventType, ipAddress, username, userAgent, details);
            dosProtectionLogger.warn(logEntry);
        }
    }

    /**
     * Log login history events
     */
    public void logLoginHistoryEvent(String eventType, String username, Long userId, String ipAddress, 
                                   String loginStatus, String loginType, String details) {
        if (loggingConfig.getLoginHistory().isEnabled()) {
            String logEntry = String.format("[LOGIN_HISTORY] %s | Type: %s | User: %s | UserID: %s | IP: %s | Status: %s | LoginType: %s | Details: %s", 
                getCurrentTimestamp(), eventType, username, userId, ipAddress, loginStatus, loginType, details);
            loginHistoryLogger.info(logEntry);
        }
    }

    /**
     * Log authentication attempts
     */
    public void logAuthenticationAttempt(String username, String ipAddress, String userAgent, boolean success, String reason) {
        String status = success ? "SUCCESS" : "FAILED";
        String logEntry = String.format("[AUTHENTICATION] %s | User: %s | IP: %s | UserAgent: %s | Status: %s | Reason: %s", 
            getCurrentTimestamp(), username, ipAddress, userAgent, status, reason);
        
        if (success) {
            securityLogger.info(logEntry);
        } else {
            securityLogger.warn(logEntry);
        }
    }

    /**
     * Log SQL injection attempts
     */
    public void logSqlInjectionAttempt(String field, String value, String ipAddress, String userAgent) {
        String logEntry = String.format("[SQL_INJECTION_ATTEMPT] %s | Field: %s | Value: %s | IP: %s | UserAgent: %s", 
            getCurrentTimestamp(), field, sanitizeForLogging(value), ipAddress, userAgent);
        securityLogger.error(logEntry);
    }

    /**
     * Log security validation failures
     */
    public void logSecurityValidationFailure(String validationType, String field, String value, String ipAddress) {
        String logEntry = String.format("[SECURITY_VALIDATION_FAILURE] %s | Type: %s | Field: %s | Value: %s | IP: %s", 
            getCurrentTimestamp(), validationType, field, sanitizeForLogging(value), ipAddress);
        securityLogger.warn(logEntry);
    }

    /**
     * Log file upload security events
     */
    public void logFileUploadSecurityEvent(String eventType, String filename, String mimeType, long fileSize, 
                                         String username, String ipAddress) {
        String logEntry = String.format("[FILE_UPLOAD_SECURITY] %s | Type: %s | File: %s | MimeType: %s | Size: %d | User: %s | IP: %s", 
            getCurrentTimestamp(), eventType, filename, mimeType, fileSize, username, ipAddress);
        securityLogger.warn(logEntry);
    }

    /**
     * Log rate limiting events
     */
    public void logRateLimitingEvent(String eventType, String ipAddress, String endpoint, int requestCount, String timeWindow) {
        String logEntry = String.format("[RATE_LIMITING] %s | Type: %s | IP: %s | Endpoint: %s | RequestCount: %d | TimeWindow: %s", 
            getCurrentTimestamp(), eventType, ipAddress, endpoint, requestCount, timeWindow);
        dosProtectionLogger.warn(logEntry);
    }

    /**
     * Log admin access events
     */
    public void logAdminAccessEvent(String action, String username, String ipAddress, String resourceAccessed, boolean success) {
        String status = success ? "SUCCESS" : "DENIED";
        String logEntry = String.format("[ADMIN_ACCESS] %s | Action: %s | User: %s | IP: %s | Resource: %s | Status: %s", 
            getCurrentTimestamp(), action, username, ipAddress, resourceAccessed, status);
        securityLogger.info(logEntry);
    }

    /**
     * Get current timestamp in standard format
     */
    private String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));
    }

    /**
     * Sanitize values for safe logging (prevent log injection)
     */
    private String sanitizeForLogging(String value) {
        if (value == null) {
            return "null";
        }
        
        // Remove control characters and limit length
        String sanitized = value.replaceAll("[\\r\\n\\t]", "_")
                               .replaceAll("[\\x00-\\x1F\\x7F]", "")
                               .trim();
        
        // Limit length for logging
        if (sanitized.length() > 100) {
            sanitized = sanitized.substring(0, 97) + "...";
        }
        
        return sanitized;
    }

    /**
     * Create structured log message for JSON-like output
     */
    public String createStructuredLogMessage(String eventType, Object... keyValuePairs) {
        StringBuilder sb = new StringBuilder();
        sb.append("[").append(eventType).append("] ");
        sb.append(getCurrentTimestamp()).append(" | ");
        
        for (int i = 0; i < keyValuePairs.length; i += 2) {
            if (i + 1 < keyValuePairs.length) {
                sb.append(keyValuePairs[i]).append(": ").append(keyValuePairs[i + 1]);
                if (i + 2 < keyValuePairs.length) {
                    sb.append(" | ");
                }
            }
        }
        
        return sb.toString();
    }
}
