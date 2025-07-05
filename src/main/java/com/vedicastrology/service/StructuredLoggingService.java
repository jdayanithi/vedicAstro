package com.vedicastrology.service;

import com.vedicastrology.config.LoggingConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * Optimized structured logging service for different types of events
 * Includes performance optimizations for large string masking
 */
@Service
public class StructuredLoggingService {

    // Dedicated loggers for different types of events
    private static final Logger securityLogger = LoggerFactory.getLogger("com.vedicastrology.security");
    private static final Logger performanceLogger = LoggerFactory.getLogger("com.vedicastrology.aop.PerformanceLoggingAspect");
    private static final Logger dosProtectionLogger = LoggerFactory.getLogger("com.vedicastrology.security.DosProtectionService");
    private static final Logger loginHistoryLogger = LoggerFactory.getLogger("com.vedicastrology.service.LoginHistoryService");
    
    // Performance optimizations: Pre-compiled regex patterns
    private static final Pattern PASSWORD_PATTERN1 = Pattern.compile("(?i)(password[\"'\\s]*[:=][\"'\\s]*)([^\\s,}\\]\"']+)");
    private static final Pattern PASSWORD_PATTERN2 = Pattern.compile("(?i)(pwd[\"'\\s]*[:=][\"'\\s]*)([^\\s,}\\]\"']+)");
    private static final Pattern PASSWORD_PATTERN3 = Pattern.compile("(?i)(pass[\"'\\s]*[:=][\"'\\s]*)([^\\s,}\\]\"']+)");
    private static final Pattern CREDIT_CARD_PATTERN = Pattern.compile("\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("\\b([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})\\b");
    private static final Pattern PHONE_PATTERN = Pattern.compile("\\b\\d{3}[\\s-]?\\d{3}[\\s-]?\\d{4}\\b");
    private static final Pattern SSN_PATTERN = Pattern.compile("\\b\\d{3}[\\s-]?\\d{2}[\\s-]?\\d{4}\\b");
    private static final Pattern CONTROL_CHARS_PATTERN = Pattern.compile("[\\r\\n\\t]");
    private static final Pattern INVALID_CHARS_PATTERN = Pattern.compile("[\\x00-\\x1F\\x7F]");
    
    // Performance configuration
    private static final int MAX_LOG_LENGTH = 1000;  // Increased from 100 for better context
    private static final int MASKING_THRESHOLD = 500; // Only apply regex masking if string is under this length
    private static final String TRUNCATED_SUFFIX = "...[TRUNCATED]";
    
    @Autowired
    private LoggingConfiguration loggingConfig;

    /**
     * Log security events
     */
    public void logSecurityEvent(String eventType, String username, String ipAddress, String details) {
        if (loggingConfig.getSecurity().isEnabled()) {
            String logEntry = String.format("[SECURITY] %s | Type: %s | User: %s | IP: %s | Details: %s", 
                getCurrentTimestamp(), eventType, maskUsername(username), ipAddress, sanitizeForLogging(details));
            securityLogger.warn(logEntry);
        }
    }

    /**
     * Log suspicious activity
     */
    public void logSuspiciousActivity(String activityType, String username, String ipAddress, String userAgent, String reason) {
        if (loggingConfig.getSecurity().isEnabled()) {
            String logEntry = String.format("[SUSPICIOUS_ACTIVITY] %s | Type: %s | User: %s | IP: %s | UserAgent: %s | Reason: %s", 
                getCurrentTimestamp(), activityType, maskUsername(username), ipAddress, sanitizeForLogging(userAgent), sanitizeForLogging(reason));
            securityLogger.error(logEntry);
        }
    }

    /**
     * Log performance events
     */
    public void logPerformanceEvent(String method, long executionTimeMs, String requestInfo) {
        if (loggingConfig.getPerformance().isEnabled()) {
            String logEntry = String.format("[PERFORMANCE] %s | Method: %s | ExecutionTime: %dms | Request: %s", 
                getCurrentTimestamp(), method, executionTimeMs, sanitizeForLogging(requestInfo));
            
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
                getCurrentTimestamp(), eventType, ipAddress, maskUsername(username), sanitizeForLogging(userAgent), sanitizeForLogging(details));
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
                getCurrentTimestamp(), eventType, maskUsername(username), maskUserId(userId), ipAddress, loginStatus, loginType, sanitizeForLogging(details));
            loginHistoryLogger.info(logEntry);
        }
    }

    /**
     * Log authentication attempts
     */
    public void logAuthenticationAttempt(String username, String ipAddress, String userAgent, boolean success, String reason) {
        String status = success ? "SUCCESS" : "FAILED";
        String logEntry = String.format("[AUTHENTICATION] %s | User: %s | IP: %s | UserAgent: %s | Status: %s | Reason: %s", 
            getCurrentTimestamp(), maskUsername(username), ipAddress, sanitizeForLogging(userAgent), status, sanitizeForLogging(reason));
        
        if (success) {
            securityLogger.info(logEntry);
        } else {
            securityLogger.warn(logEntry);
        }
    }

    /**
     * Log authentication attempts with password field (password will be masked)
     */
    public void logAuthenticationAttemptWithPassword(String username, String password, String ipAddress, String userAgent, boolean success, String reason) {
        String status = success ? "SUCCESS" : "FAILED";
        String logEntry = String.format("[AUTHENTICATION] %s | User: %s | Password: %s | IP: %s | UserAgent: %s | Status: %s | Reason: %s", 
            getCurrentTimestamp(), maskUsername(username), maskPassword(password), ipAddress, sanitizeForLogging(userAgent), status, sanitizeForLogging(reason));
        
        if (success) {
            securityLogger.info(logEntry);
        } else {
            securityLogger.warn(logEntry);
        }
    }

    /**
     * Log user registration events (masks sensitive data)
     */
    public void logUserRegistrationEvent(String username, String email, Long userId, String ipAddress, boolean success, String details) {
        String status = success ? "SUCCESS" : "FAILED";
        String logEntry = String.format("[USER_REGISTRATION] %s | User: %s | Email: %s | UserID: %s | IP: %s | Status: %s | Details: %s", 
            getCurrentTimestamp(), maskUsername(username), sanitizeForLogging(email), maskUserId(userId), ipAddress, status, sanitizeForLogging(details));
        securityLogger.info(logEntry);
    }

    /**
     * Log password change events
     */
    public void logPasswordChangeEvent(String username, Long userId, String ipAddress, boolean success, String reason) {
        String status = success ? "SUCCESS" : "FAILED";
        String logEntry = String.format("[PASSWORD_CHANGE] %s | User: %s | UserID: %s | IP: %s | Status: %s | Reason: %s", 
            getCurrentTimestamp(), maskUsername(username), maskUserId(userId), ipAddress, status, sanitizeForLogging(reason));
        securityLogger.info(logEntry);
    }

    /**
     * Log SQL injection attempts
     */
    public void logSqlInjectionAttempt(String field, String value, String ipAddress, String userAgent) {
        String logEntry = String.format("[SQL_INJECTION_ATTEMPT] %s | Field: %s | Value: %s | IP: %s | UserAgent: %s", 
            getCurrentTimestamp(), field, sanitizeForLogging(value), ipAddress, sanitizeForLogging(userAgent));
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
            getCurrentTimestamp(), eventType, filename, mimeType, fileSize, maskUsername(username), ipAddress);
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
            getCurrentTimestamp(), action, maskUsername(username), ipAddress, resourceAccessed, status);
        securityLogger.info(logEntry);
    }

    /**
     * Get current timestamp in standard format
     */
    private String getCurrentTimestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));
    }

    /**
     * Optimized sanitize method for safe logging with performance considerations
     */
    private String sanitizeForLogging(String value) {
        if (value == null) {
            return "null";
        }
        
        // Early truncation for very large strings to avoid performance issues
        if (value.length() > MAX_LOG_LENGTH) {
            value = value.substring(0, MAX_LOG_LENGTH - TRUNCATED_SUFFIX.length()) + TRUNCATED_SUFFIX;
        }
        
        // Apply sensitive data masking only if string is under threshold
        String sanitized = (value.length() <= MASKING_THRESHOLD) ? 
            maskSensitiveDataOptimized(value) : maskSensitiveDataFast(value);
        
        // Fast character replacement using pre-compiled patterns
        sanitized = CONTROL_CHARS_PATTERN.matcher(sanitized).replaceAll("_");
        sanitized = INVALID_CHARS_PATTERN.matcher(sanitized).replaceAll("");
        sanitized = sanitized.trim();
        
        return sanitized;
    }

    /**
     * Optimized sensitive data masking for smaller strings (full regex processing)
     */
    private String maskSensitiveDataOptimized(String value) {
        if (value == null || value.trim().isEmpty()) {
            return value;
        }
        
        String masked = value;
        
        // Use pre-compiled patterns for better performance
        masked = PASSWORD_PATTERN1.matcher(masked).replaceAll("$1***MASKED***");
        masked = PASSWORD_PATTERN2.matcher(masked).replaceAll("$1***MASKED***");
        masked = PASSWORD_PATTERN3.matcher(masked).replaceAll("$1***MASKED***");
        masked = CREDIT_CARD_PATTERN.matcher(masked).replaceAll("****-****-****-****");
        masked = EMAIL_PATTERN.matcher(masked).replaceAll("$1***@$2");
        masked = PHONE_PATTERN.matcher(masked).replaceAll("***-***-****");
        masked = SSN_PATTERN.matcher(masked).replaceAll("***-**-****");
        
        return masked;
    }

    /**
     * Fast sensitive data masking for larger strings (keyword-based approach)
     */
    private String maskSensitiveDataFast(String value) {
        if (value == null || value.trim().isEmpty()) {
            return value;
        }
        
        // For large strings, use simple string operations instead of regex
        String masked = value;
        
        // Fast keyword-based masking (case-insensitive)
        String lowerValue = value.toLowerCase();
        
        // Check for password keywords and mask nearby content
        if (lowerValue.contains("password") || lowerValue.contains("pwd") || lowerValue.contains("pass")) {
            masked = maskPasswordKeywords(masked);
        }
        
        // Fast credit card detection (look for 16 consecutive digits)
        masked = maskLongNumbers(masked);
        
        // Fast email detection (simple @ symbol approach)
        masked = maskEmailsFast(masked);
        
        return masked;
    }

    /**
     * Fast password masking using simple string operations
     */
    private String maskPasswordKeywords(String value) {
        String[] passwordKeywords = {"password", "pwd", "pass"};
        String result = value;
        
        for (String keyword : passwordKeywords) {
            int index = result.toLowerCase().indexOf(keyword);
            while (index != -1) {
                // Find the value part after the keyword
                int valueStart = index + keyword.length();
                
                // Skip over common separators
                while (valueStart < result.length() && 
                       "=: \"'".indexOf(result.charAt(valueStart)) != -1) {
                    valueStart++;
                }
                
                // Find the end of the value
                int valueEnd = valueStart;
                while (valueEnd < result.length() && 
                       " ,}]\"'\n\r\t".indexOf(result.charAt(valueEnd)) == -1) {
                    valueEnd++;
                }
                
                // Replace the password value
                if (valueEnd > valueStart) {
                    result = result.substring(0, valueStart) + "***MASKED***" + result.substring(valueEnd);
                }
                
                // Look for next occurrence
                index = result.toLowerCase().indexOf(keyword, valueStart + 12); // 12 = length of "***MASKED***"
            }
        }
        
        return result;
    }

    /**
     * Fast masking of long number sequences (potential credit cards)
     */
    private String maskLongNumbers(String value) {
        StringBuilder result = new StringBuilder();
        StringBuilder numberBuffer = new StringBuilder();
        
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            
            if (Character.isDigit(c) || c == '-' || c == ' ') {
                numberBuffer.append(c);
            } else {
                // Process accumulated number buffer
                if (numberBuffer.length() > 0) {
                    String numberStr = numberBuffer.toString().replaceAll("[\\s-]", "");
                    if (numberStr.length() >= 13 && numberStr.length() <= 19) {
                        // Likely a credit card number
                        result.append("****-****-****-****");
                    } else {
                        result.append(numberBuffer);
                    }
                    numberBuffer.setLength(0);
                }
                result.append(c);
            }
        }
        
        // Handle number buffer at end of string
        if (numberBuffer.length() > 0) {
            String numberStr = numberBuffer.toString().replaceAll("[\\s-]", "");
            if (numberStr.length() >= 13 && numberStr.length() <= 19) {
                result.append("****-****-****-****");
            } else {
                result.append(numberBuffer);
            }
        }
        
        return result.toString();
    }

    /**
     * Fast email masking using simple string operations
     */
    private String maskEmailsFast(String value) {
        StringBuilder result = new StringBuilder();
        int i = 0;
        
        while (i < value.length()) {
            int atIndex = value.indexOf('@', i);
            if (atIndex == -1) {
                result.append(value.substring(i));
                break;
            }
            
            // Find the start of the email (look backwards for word boundary)
            int emailStart = atIndex - 1;
            while (emailStart >= i && isEmailChar(value.charAt(emailStart))) {
                emailStart--;
            }
            emailStart++;
            
            // Find the end of the email (look forwards for word boundary)
            int emailEnd = atIndex + 1;
            while (emailEnd < value.length() && isEmailChar(value.charAt(emailEnd))) {
                emailEnd++;
            }
            
            // Check if this looks like a valid email
            if (atIndex > emailStart && emailEnd > atIndex + 1) {
                String username = value.substring(emailStart, atIndex);
                String domain = value.substring(atIndex, emailEnd);
                
                result.append(value, i, emailStart);
                result.append(username).append("***").append(domain);
                i = emailEnd;
            } else {
                result.append(value, i, atIndex + 1);
                i = atIndex + 1;
            }
        }
        
        return result.toString();
    }

    /**
     * Helper method to check if character is valid in email
     */
    private boolean isEmailChar(char c) {
        return Character.isLetterOrDigit(c) || c == '.' || c == '_' || c == '%' || 
               c == '+' || c == '-';
    }

    /**
     * Mask user ID for logging (keep first and last character if long enough)
     */
    private String maskUserId(Object userId) {
        if (userId == null) {
            return "null";
        }
        
        String id = userId.toString();
        if (id.length() <= 2) {
            return "***";
        } else if (id.length() <= 4) {
            return id.charAt(0) + "***";
        } else {
            return id.charAt(0) + "***" + id.charAt(id.length() - 1);
        }
    }

    /**
     * Mask username for logging (keep first and last character if long enough)
     */
    private String maskUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            return "null";
        }
        
        username = username.trim();
        if (username.length() <= 2) {
            return "***";
        } else if (username.length() <= 4) {
            return username.charAt(0) + "***";
        } else {
            return username.charAt(0) + "***" + username.charAt(username.length() - 1);
        }
    }

    /**
     * Completely mask password fields
     */
    private String maskPassword(String password) {
        return "***MASKED***";
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

    /**
     * Performance-optimized logging method with timing
     */
    public void logWithPerformanceMonitoring(String logType, String message) {
        long startTime = System.nanoTime();
        
        String sanitizedMessage = sanitizeForLogging(message);
        
        long endTime = System.nanoTime();
        long durationMicros = (endTime - startTime) / 1000;
        
        // Log the actual message
        securityLogger.info("[{}] {} | Processing time: {}μs", logType, sanitizedMessage, durationMicros);
        
        // If masking took longer than 1ms, log a performance warning
        if (durationMicros > 1000) {
            performanceLogger.warn("[SLOW_MASKING] Masking took {}μs for {} chars", durationMicros, message.length());
        }
    }

    /**
     * Get performance statistics for masking operations
     */
    public String getMaskingPerformanceInfo(String testString) {
        long startTime, endTime;
        
        // Test optimized approach
        startTime = System.nanoTime();
        sanitizeForLogging(testString);
        endTime = System.nanoTime();
        long optimizedTime = (endTime - startTime) / 1000;
        
        return String.format("Optimized masking: %dμs for %d chars | Approach: %s", 
            optimizedTime, testString.length(), 
            testString.length() > MASKING_THRESHOLD ? "Fast (keyword-based)" : "Full (regex-based)");
    }
}
