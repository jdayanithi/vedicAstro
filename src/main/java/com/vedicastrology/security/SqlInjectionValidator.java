package com.vedicastrology.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * 🛡️ SQL Injection Prevention Utility
 * Provides comprehensive protection against SQL injection attacks
 */
@Component
public class SqlInjectionValidator {
    
    private static final Logger logger = LoggerFactory.getLogger(SqlInjectionValidator.class);
    
    // SQL injection patterns to detect
    private static final Pattern[] SQL_INJECTION_PATTERNS = {
        // Basic SQL injection patterns
        Pattern.compile("(?i).*('|(\\-\\-)|(;)|(\\|)|(\\*)).*"),
        
        // UNION based injections
        Pattern.compile("(?i).*(union|select|insert|update|delete|drop|create|alter|exec|execute).*"),
        
        // Comment patterns
        Pattern.compile("(?i).*((\\/\\*)|(\\*\\/)|(\\-\\-)|(#)).*"),
        
        // OR/AND patterns with 1=1 or similar
        Pattern.compile("(?i).*(or|and)\\s+(1\\s*=\\s*1|true|false).*"),
        
        // Hex encoding patterns
        Pattern.compile("(?i).*0x[0-9a-f]+.*"),
        
        // CONCAT and CHAR functions
        Pattern.compile("(?i).*(concat|char|ascii|substring|length)\\s*\\(.*"),
        
        // Database specific functions
        Pattern.compile("(?i).*(sleep|benchmark|waitfor|delay)\\s*\\(.*"),
        
        // Information schema access
        Pattern.compile("(?i).*(information_schema|sys\\.|mysql\\.|pg_).*"),
        
        // Script tags and XSS patterns (for double protection)
        Pattern.compile("(?i).*<\\s*(script|iframe|object|embed|form).*"),
        
        // SQL operators in suspicious contexts
        Pattern.compile("(?i).*(\\bor\\b|\\band\\b)\\s*['\"]*\\s*\\d+\\s*['\"]*\\s*(=|<|>).*"),
        
        // Blind SQL injection patterns
        Pattern.compile("(?i).*(if\\s*\\(|case\\s+when|waitfor\\s+delay).*"),
        
        // SQL functions that could be used maliciously
        Pattern.compile("(?i).*(cast\\s*\\(|convert\\s*\\(|substring\\s*\\(|replace\\s*\\().*"),
    };
    
    // Dangerous SQL keywords
    private static final Set<String> DANGEROUS_KEYWORDS = new HashSet<>(Arrays.asList(
        "select", "insert", "update", "delete", "drop", "create", "alter", "truncate",
        "union", "where", "having", "group", "order", "limit", "offset",
        "exec", "execute", "sp_", "xp_", "cmd", "shell",
        "information_schema", "sys", "mysql", "performance_schema",
        "pg_catalog", "pg_user", "pg_shadow", "pg_group",
        "master", "tempdb", "model", "msdb",
        "script", "javascript", "vbscript", "onload", "onerror"
    ));
    
    // Characters that are often used in SQL injection (reduced for Tamil text support)
    private static final Set<Character> DANGEROUS_CHARS = new HashSet<>(Arrays.asList(
        '\'', '"', ';', '|', '*', '\\', '<', '>', '!', '@', '#', '$',
        '{', '}', '^', '~', '`'
    ));
    
    /**
     * Validates input for SQL injection patterns
     * @param input The input string to validate
     * @param fieldName The name of the field being validated (for logging)
     * @return ValidationResult containing validation status and sanitized value
     */
    public ValidationResult validateInput(String input, String fieldName) {
        if (input == null || input.trim().isEmpty()) {
            return ValidationResult.valid(input);
        }
        
        String originalInput = input;
        String trimmedInput = input.trim();
        
        logger.debug("🔍 Validating input for field '{}': '{}'", fieldName, 
                     trimmedInput.length() > 50 ? trimmedInput.substring(0, 50) + "..." : trimmedInput);
        
        // Check for SQL injection patterns
        for (Pattern pattern : SQL_INJECTION_PATTERNS) {
            if (pattern.matcher(trimmedInput).matches()) {
                logger.warn("🚨 SQL Injection attempt detected in field '{}': Pattern matched - {}", 
                           fieldName, pattern.pattern());
                logSecurityViolation(fieldName, originalInput, "SQL_INJECTION_PATTERN", pattern.pattern());
                return ValidationResult.invalid("Invalid characters detected in " + fieldName);
            }
        }
        
        // Check for dangerous keywords
        String lowerInput = trimmedInput.toLowerCase();
        for (String keyword : DANGEROUS_KEYWORDS) {
            if (lowerInput.contains(keyword)) {
                logger.warn("🚨 Dangerous SQL keyword detected in field '{}': '{}'", fieldName, keyword);
                logSecurityViolation(fieldName, originalInput, "DANGEROUS_KEYWORD", keyword);
                return ValidationResult.invalid("Invalid content detected in " + fieldName);
            }
        }
        
        // Check for excessive dangerous characters (more lenient for international text)
        int dangerousCharCount = 0;
        for (char c : trimmedInput.toCharArray()) {
            if (DANGEROUS_CHARS.contains(c)) {
                dangerousCharCount++;
            }
        }
        
        // Allow up to 5 dangerous characters for international content (like Tamil)
        // that might contain various Unicode punctuation
        if (dangerousCharCount > 5) {
            logger.warn("🚨 Too many dangerous characters in field '{}': {} dangerous chars found", 
                       fieldName, dangerousCharCount);
            logSecurityViolation(fieldName, originalInput, "EXCESSIVE_DANGEROUS_CHARS", 
                               String.valueOf(dangerousCharCount));
            return ValidationResult.invalid("Invalid format in " + fieldName);
        }
        
        // Sanitize the input
        String sanitizedInput = sanitizeInput(trimmedInput);
        
        logger.debug("✅ Input validation passed for field '{}'", fieldName);
        return ValidationResult.valid(sanitizedInput);
    }
    
    /**
     * Validates numeric input to ensure it's a valid number and within safe ranges
     */
    public ValidationResult validateNumericInput(String input, String fieldName, Long minValue, Long maxValue) {
        if (input == null || input.trim().isEmpty()) {
            return ValidationResult.invalid(fieldName + " cannot be empty");
        }
        
        try {
            Long value = Long.parseLong(input.trim());
            
            if (minValue != null && value < minValue) {
                logger.warn("🚨 Numeric value below minimum for field '{}': {} < {}", fieldName, value, minValue);
                return ValidationResult.invalid(fieldName + " must be at least " + minValue);
            }
            
            if (maxValue != null && value > maxValue) {
                logger.warn("🚨 Numeric value above maximum for field '{}': {} > {}", fieldName, value, maxValue);
                return ValidationResult.invalid(fieldName + " must be at most " + maxValue);
            }
            
            return ValidationResult.valid(value.toString());
        } catch (NumberFormatException e) {
            logger.warn("🚨 Invalid numeric format for field '{}': '{}'", fieldName, input);
            logSecurityViolation(fieldName, input, "INVALID_NUMERIC_FORMAT", e.getMessage());
            return ValidationResult.invalid(fieldName + " must be a valid number");
        }
    }
    
    /**
     * Validates course content (title/description) with special handling for international text
     */
    public ValidationResult validateCourseContent(String input, String fieldName) {
        if (input == null || input.trim().isEmpty()) {
            return ValidationResult.valid(input);
        }
        
        String originalInput = input;
        String trimmedInput = input.trim();
        
        logger.debug("🔍 Validating course content for field '{}': '{}'", fieldName, 
                     trimmedInput.length() > 50 ? trimmedInput.substring(0, 50) + "..." : trimmedInput);
        
        // For course content, only check for obvious SQL injection patterns
        // Skip character-by-character validation to allow Tamil and other international text
        String lowerInput = trimmedInput.toLowerCase();
        
        // Only block obvious SQL injection attempts
        if (lowerInput.contains("' or '") ||
            lowerInput.contains("\" or \"") ||
            lowerInput.contains("1=1") ||
            lowerInput.contains("' union ") ||
            lowerInput.contains("drop table") ||
            lowerInput.contains("delete from") ||
            lowerInput.contains("insert into")) {
            
            logger.warn("🚨 SQL Injection attempt detected in course content field '{}': Pattern matched", fieldName);
            logSecurityViolation(fieldName, originalInput, "COURSE_CONTENT_SQL_INJECTION", "SQL injection pattern");
            return ValidationResult.invalid("Invalid content detected in " + fieldName);
        }
        
        // For course content, perform minimal sanitization to preserve Tamil text
        String sanitizedInput = sanitizeCourseContent(trimmedInput);
        
        logger.debug("✅ Course content validation passed for field '{}'", fieldName);
        return ValidationResult.valid(sanitizedInput);
    }
    
    /**
     * Minimal sanitization for course content to preserve international text
     */
    private String sanitizeCourseContent(String input) {
        if (input == null) return null;
        
        return input
            .replaceAll("--", "") // Remove SQL comments
            .replaceAll("/\\*", "") // Remove block comments start
            .replaceAll("\\*/", "") // Remove block comments end
            .trim();
    }

    /**
     * Validates search queries with special handling for search functionality
     */
    public ValidationResult validateSearchQuery(String query, String fieldName) {
        if (query == null || query.trim().isEmpty()) {
            return ValidationResult.invalid("Search query cannot be empty");
        }
        
        String trimmedQuery = query.trim();
        
        // More lenient validation for search queries, but still secure
        if (trimmedQuery.length() > 100) {
            logger.warn("🚨 Search query too long for field '{}': {} chars", fieldName, trimmedQuery.length());
            return ValidationResult.invalid("Search query too long (max 100 characters)");
        }
        
        // Check for obvious SQL injection attempts in search
        if (containsSqlInjectionIndicators(trimmedQuery)) {
            logger.warn("🚨 SQL injection attempt in search query '{}': '{}'", fieldName, trimmedQuery);
            logSecurityViolation(fieldName, trimmedQuery, "SEARCH_SQL_INJECTION", "SQL indicators detected");
            return ValidationResult.invalid("Invalid search query format");
        }
        
        // Sanitize search query
        String sanitizedQuery = sanitizeSearchQuery(trimmedQuery);
        
        return ValidationResult.valid(sanitizedQuery);
    }
    
    /**
     * Sanitize input by removing/escaping dangerous characters
     */
    private String sanitizeInput(String input) {
        if (input == null) return null;
        
        return input
            .replaceAll("--", "") // Remove SQL comments
            .replaceAll("/\\*", "") // Remove block comments start
            .replaceAll("\\*/", "") // Remove block comments end
            .replaceAll(";", "") // Remove statement terminators
            .replaceAll("\\|", "") // Remove pipe characters
            .trim();
    }
    
    /**
     * Sanitize search queries more carefully to preserve search functionality
     */
    private String sanitizeSearchQuery(String query) {
        if (query == null) return null;
        
        return query
            .replaceAll("['\"`;]", "") // Remove quotes and semicolons
            .replaceAll("--", "") // Remove SQL comments
            .replaceAll("/\\*.*?\\*/", "") // Remove block comments
            .replaceAll("\\s+", " ") // Normalize whitespace
            .trim();
    }
    
    /**
     * Check for obvious SQL injection indicators
     */
    private boolean containsSqlInjectionIndicators(String input) {
        String lowerInput = input.toLowerCase();
        
        // Look for SQL injection patterns commonly used in search attacks
        return lowerInput.contains("' or '") ||
               lowerInput.contains("\" or \"") ||
               lowerInput.contains("1=1") ||
               lowerInput.contains("' union ") ||
               lowerInput.contains("' and ") ||
               lowerInput.contains("' or ") ||
               lowerInput.matches(".*\\d+\\s*(=|<|>)\\s*\\d+.*");
    }
    
    /**
     * Log security violations for monitoring and alerting
     */
    private void logSecurityViolation(String fieldName, String input, String violationType, String details) {
        logger.error("🚨 SECURITY_VIOLATION: Field={}, Type={}, Details={}, Input='{}'", 
                    fieldName, violationType, details, 
                    input.length() > 100 ? input.substring(0, 100) + "..." : input);
        
        // Here you could integrate with security monitoring systems
        // like sending alerts to security team, incrementing attack counters, etc.
    }
    
    /**
     * Validation result class
     */
    public static class ValidationResult {
        private final boolean valid;
        private final String sanitizedValue;
        private final String errorMessage;
        
        private ValidationResult(boolean valid, String sanitizedValue, String errorMessage) {
            this.valid = valid;
            this.sanitizedValue = sanitizedValue;
            this.errorMessage = errorMessage;
        }
        
        public static ValidationResult valid(String sanitizedValue) {
            return new ValidationResult(true, sanitizedValue, null);
        }
        
        public static ValidationResult invalid(String errorMessage) {
            return new ValidationResult(false, null, errorMessage);
        }
        
        public boolean isValid() { return valid; }
        public String getSanitizedValue() { return sanitizedValue; }
        public String getErrorMessage() { return errorMessage; }
    }
}
