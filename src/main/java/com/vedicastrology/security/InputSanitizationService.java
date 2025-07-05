package com.vedicastrology.security;

import com.vedicastrology.security.SqlInjectionValidator.ValidationResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 🛡️ Input Sanitization Service
 * Provides methods to sanitize and validate various types of input data
 */
@Service
public class InputSanitizationService {
    
    private static final Logger logger = LoggerFactory.getLogger(InputSanitizationService.class);
    
    @Autowired
    private SqlInjectionValidator sqlInjectionValidator;
    
    /**
     * Sanitize and validate a single string input
     */
    public String sanitizeString(String input, String fieldName) throws SecurityException {
        if (input == null) {
            return null;
        }
        
        ValidationResult result = sqlInjectionValidator.validateInput(input, fieldName);
        if (!result.isValid()) {
            throw new SecurityException("Input validation failed for " + fieldName + ": " + result.getErrorMessage());
        }
        
        return result.getSanitizedValue();
    }
    
    /**
     * Sanitize and validate a search query
     */
    public String sanitizeSearchQuery(String query, String fieldName) throws SecurityException {
        if (query == null || query.trim().isEmpty()) {
            return "";
        }
        
        ValidationResult result = sqlInjectionValidator.validateSearchQuery(query, fieldName);
        if (!result.isValid()) {
            throw new SecurityException("Search query validation failed for " + fieldName + ": " + result.getErrorMessage());
        }
        
        return result.getSanitizedValue();
    }
    
    /**
     * Sanitize and validate numeric input
     */
    public Long sanitizeNumericInput(String input, String fieldName, Long minValue, Long maxValue) throws SecurityException {
        if (input == null || input.trim().isEmpty()) {
            throw new SecurityException(fieldName + " cannot be empty");
        }
        
        ValidationResult result = sqlInjectionValidator.validateNumericInput(input, fieldName, minValue, maxValue);
        if (!result.isValid()) {
            throw new SecurityException("Numeric validation failed for " + fieldName + ": " + result.getErrorMessage());
        }
        
        try {
            return Long.parseLong(result.getSanitizedValue());
        } catch (NumberFormatException e) {
            throw new SecurityException("Invalid numeric format for " + fieldName);
        }
    }
    
    /**
     * Sanitize a map of string inputs
     */
    public Map<String, String> sanitizeStringMap(Map<String, String> inputMap) throws SecurityException {
        if (inputMap == null || inputMap.isEmpty()) {
            return new HashMap<>();
        }
        
        Map<String, String> sanitizedMap = new HashMap<>();
        
        for (Map.Entry<String, String> entry : inputMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            
            // Validate key
            String sanitizedKey = sanitizeString(key, "mapKey");
            
            // Validate value
            String sanitizedValue = sanitizeString(value, "mapValue_" + key);
            
            sanitizedMap.put(sanitizedKey, sanitizedValue);
        }
        
        return sanitizedMap;
    }
    
    /**
     * Sanitize a list of strings
     */
    public List<String> sanitizeStringList(List<String> inputList, String fieldName) throws SecurityException {
        if (inputList == null || inputList.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> sanitizedList = new ArrayList<>();
        
        for (int i = 0; i < inputList.size(); i++) {
            String input = inputList.get(i);
            String sanitizedInput = sanitizeString(input, fieldName + "[" + i + "]");
            sanitizedList.add(sanitizedInput);
        }
        
        return sanitizedList;
    }
    
    /**
     * Validate and sanitize email format
     */
    public String sanitizeEmail(String email, String fieldName) throws SecurityException {
        if (email == null || email.trim().isEmpty()) {
            throw new SecurityException(fieldName + " cannot be empty");
        }
        
        // First, basic SQL injection check
        String sanitizedEmail = sanitizeString(email, fieldName);
        
        // Email format validation
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        if (!sanitizedEmail.matches(emailRegex)) {
            logger.warn("🚨 Invalid email format for field '{}': '{}'", fieldName, sanitizedEmail);
            throw new SecurityException("Invalid email format for " + fieldName);
        }
        
        // Check email length
        if (sanitizedEmail.length() > 254) {
            throw new SecurityException("Email address too long for " + fieldName);
        }
        
        return sanitizedEmail.toLowerCase().trim();
    }
    
    /**
     * Validate and sanitize URL input
     */
    public String sanitizeUrl(String url, String fieldName) throws SecurityException {
        if (url == null || url.trim().isEmpty()) {
            return null;
        }
        
        // Basic SQL injection check
        String sanitizedUrl = sanitizeString(url, fieldName);
        
        // URL format validation
        try {
            java.net.URL validUrl = new java.net.URL(sanitizedUrl);
            String protocol = validUrl.getProtocol().toLowerCase();
            
            // Only allow http and https
            if (!protocol.equals("http") && !protocol.equals("https")) {
                throw new SecurityException("Invalid URL protocol for " + fieldName + ". Only HTTP and HTTPS allowed.");
            }
            
            return sanitizedUrl;
        } catch (java.net.MalformedURLException e) {
            logger.warn("🚨 Invalid URL format for field '{}': '{}'", fieldName, sanitizedUrl);
            throw new SecurityException("Invalid URL format for " + fieldName);
        }
    }
    
    /**
     * Sanitize filename for file uploads
     */
    public String sanitizeFilename(String filename, String fieldName) throws SecurityException {
        if (filename == null || filename.trim().isEmpty()) {
            throw new SecurityException(fieldName + " cannot be empty");
        }
        
        // Remove path traversal attempts
        String sanitized = filename.replaceAll("[./\\\\]", "");
        
        // Remove dangerous characters
        sanitized = sanitized.replaceAll("[<>:\"|?*]", "");
        
        // Basic SQL injection check
        sanitized = sanitizeString(sanitized, fieldName);
        
        // Check length
        if (sanitized.length() > 255) {
            throw new SecurityException("Filename too long for " + fieldName);
        }
        
        // Ensure filename is not empty after sanitization
        if (sanitized.trim().isEmpty()) {
            throw new SecurityException("Filename is invalid for " + fieldName);
        }
        
        return sanitized.trim();
    }
    
    /**
     * Sanitize user input for display (prevent XSS)
     */
    public String sanitizeForDisplay(String input, String fieldName) throws SecurityException {
        if (input == null) {
            return null;
        }
        
        // First run SQL injection validation
        String sanitized = sanitizeString(input, fieldName);
        
        // HTML encode dangerous characters
        sanitized = sanitized
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;")
            .replace("/", "&#x2F;");
        
        return sanitized;
    }
    
    /**
     * Check if input contains only alphanumeric characters and safe symbols
     */
    public boolean isAlphanumericSafe(String input) {
        if (input == null || input.isEmpty()) {
            return true;
        }
        
        return input.matches("^[a-zA-Z0-9\\s._-]+$");
    }
    
    /**
     * Generate a security report for input validation
     */
    public SecurityReport generateSecurityReport(String input, String fieldName) {
        if (input == null || input.isEmpty()) {
            return new SecurityReport(true, "Empty input", 0);
        }
        
        ValidationResult result = sqlInjectionValidator.validateInput(input, fieldName);
        
        int riskScore = calculateRiskScore(input);
        String status = result.isValid() ? "SAFE" : "DANGEROUS";
        
        return new SecurityReport(result.isValid(), status, riskScore);
    }
    
    /**
     * Calculate risk score for input (0-100, higher is more risky)
     */
    private int calculateRiskScore(String input) {
        int score = 0;
        String lowerInput = input.toLowerCase();
        
        // Check for SQL keywords
        String[] sqlKeywords = {"select", "insert", "update", "delete", "drop", "union", "or", "and"};
        for (String keyword : sqlKeywords) {
            if (lowerInput.contains(keyword)) {
                score += 20;
            }
        }
        
        // Check for dangerous characters
        if (input.contains("'") || input.contains("\"")) score += 15;
        if (input.contains(";")) score += 25;
        if (input.contains("--")) score += 30;
        if (input.contains("/*") || input.contains("*/")) score += 25;
        
        return Math.min(score, 100);
    }
    
    /**
     * Security report class
     */
    public static class SecurityReport {
        private final boolean safe;
        private final String status;
        private final int riskScore;
        
        public SecurityReport(boolean safe, String status, int riskScore) {
            this.safe = safe;
            this.status = status;
            this.riskScore = riskScore;
        }
        
        public boolean isSafe() { return safe; }
        public String getStatus() { return status; }
        public int getRiskScore() { return riskScore; }
    }
    
    /**
     * General sanitize input method (alias for sanitizeString for backward compatibility)
     */
    public String sanitizeInput(String input, String fieldName) throws SecurityException {
        return sanitizeString(input, fieldName);
    }
}
