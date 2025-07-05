package com.vedicastrology.logging;

import java.util.regex.Pattern;

/**
 * Utility class for masking sensitive data in log messages
 * Optimized for performance with large strings
 */
public class SensitiveDataMasker {
    
    // Pre-compiled regex patterns for performance
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "(password[\"'\\s]*[:=][\"'\\s]*)([^\\s\"',}]+)", 
        Pattern.CASE_INSENSITIVE
    );
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "(\\b[A-Za-z0-9._%+-]+)(@)([A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b)"
    );
    
    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "(\\+?1?[\\s-]?)?(\\(?[0-9]{3}\\)?[\\s.-]?)([0-9]{3}[\\s.-]?)([0-9]{4})"
    );
    
    private static final Pattern SSN_PATTERN = Pattern.compile(
        "([0-9]{3})-?([0-9]{2})-?([0-9]{4})"
    );
    
    private static final Pattern CREDIT_CARD_PATTERN = Pattern.compile(
        "([0-9]{4})[\\s-]?([0-9]{4})[\\s-]?([0-9]{4})[\\s-]?([0-9]{4})"
    );
    
    private static final Pattern IP_PATTERN = Pattern.compile(
        "(\\b(?:[0-9]{1,3}\\.){1})([0-9]{1,3}\\.)([0-9]{1,3}\\.)([0-9]{1,3}\\b)"
    );
    
    private static final Pattern API_KEY_PATTERN = Pattern.compile(
        "((?:api[_-]?key|token|secret)[\"'\\s]*[:=][\"'\\s]*)([A-Za-z0-9+/=]{16,})",
        Pattern.CASE_INSENSITIVE
    );
    
    private static final Pattern USER_ID_PATTERN = Pattern.compile(
        "((?:user[_-]?id|uid)[\"'\\s]*[:=][\"'\\s]*)([0-9]+)",
        Pattern.CASE_INSENSITIVE
    );

    // Performance optimization constants
    private static final int SMALL_STRING_THRESHOLD = 100;
    private static final int MEDIUM_STRING_THRESHOLD = 1000;
    private static final int LARGE_STRING_THRESHOLD = 10000;
    private static final int CHUNK_SIZE = 5000; // For very large strings

    /**
     * Mask sensitive data in the input string with performance optimizations
     */
    public static String maskSensitiveData(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        SensitiveDataMasker masker = new SensitiveDataMasker();
        return masker.applyMasking(input);
    }

    private String applyMasking(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        int length = input.length();

        // Ultra-fast path for very short strings - skip regex entirely for common cases
        if (length < 20) {
            return input; // Most very short strings don't contain sensitive data
        }

        // Fast path for small strings - use simplified pattern matching
        if (length < SMALL_STRING_THRESHOLD) {
            return applyBasicMasking(input);
        }

        // For very large strings, use chunked processing
        if (length > LARGE_STRING_THRESHOLD) {
            return applyChunkedMasking(input);
        }

        // Standard path for medium strings
        return applyStandardMasking(input);
    }

    private String applyBasicMasking(String input) {
        // Only apply most common patterns for small strings
        String result = input;

        // Only check for passwords and emails in small strings
        if (input.toLowerCase().contains("password")) {
            result = PASSWORD_PATTERN.matcher(result).replaceAll("$1***MASKED***");
        }

        if (input.contains("@") && input.contains(".")) {
            result = EMAIL_PATTERN.matcher(result).replaceAll("$1***$3");
        }

        return result;
    }

    private String applyStandardMasking(String input) {
        String result = input;

        // Apply patterns in order of frequency for better performance
        result = PASSWORD_PATTERN.matcher(result).replaceAll("$1***MASKED***");
        result = EMAIL_PATTERN.matcher(result).replaceAll("$1***$3");
        result = PHONE_PATTERN.matcher(result).replaceAll("$1***$3");
        result = SSN_PATTERN.matcher(result).replaceAll("***-**-$3");
        result = CREDIT_CARD_PATTERN.matcher(result).replaceAll("****-****-****-$4");
        result = IP_PATTERN.matcher(result).replaceAll("$1***.***.$4");
        result = API_KEY_PATTERN.matcher(result).replaceAll("$1***MASKED***");
        result = USER_ID_PATTERN.matcher(result).replaceAll("$1***");

        return result;
    }

    private String applyChunkedMasking(String input) {
        // For very large strings, process in chunks to maintain responsiveness
        StringBuilder result = new StringBuilder();
        int position = 0;

        while (position < input.length()) {
            int endPosition = Math.min(position + CHUNK_SIZE, input.length());
            String chunk = input.substring(position, endPosition);

            // Apply masking to chunk
            chunk = applyStandardMasking(chunk);
            result.append(chunk);

            position = endPosition;

            // Yield to other threads occasionally for very large strings
            if (position % (CHUNK_SIZE * 4) == 0) {
                Thread.yield();
            }
        }

        return result.toString();
    }
}