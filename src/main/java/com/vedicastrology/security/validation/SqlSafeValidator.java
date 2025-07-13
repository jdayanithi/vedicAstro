package com.vedicastrology.security.validation;

import com.vedicastrology.security.SqlInjectionValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 🛡️ Validator implementation for SQL injection prevention
 */
@Component
public class SqlSafeValidator implements ConstraintValidator<SqlSafe, String> {
    
    @Autowired
    private SqlInjectionValidator sqlInjectionValidator;
    
    private String fieldName;
    private int maxLength;
    private boolean allowEmpty;
    
    @Override
    public void initialize(SqlSafe annotation) {
        this.fieldName = annotation.fieldName();
        this.maxLength = annotation.maxLength();
        this.allowEmpty = annotation.allowEmpty();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Handle null/empty values
        if (value == null || value.trim().isEmpty()) {
            return allowEmpty;
        }
        
        // Check length
        if (value.length() > maxLength) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                fieldName + " exceeds maximum length of " + maxLength + " characters"
            ).addConstraintViolation();
            return false;
        }
        
        // Validate for SQL injection
        SqlInjectionValidator.ValidationResult result;
        
        // Skip SQL injection validation for description fields to allow rich content
        if (isDescriptionField(fieldName)) {
            System.out.println("🔍 Skipping SQL injection validation for field: " + fieldName);
            // Only check for extremely dangerous patterns in descriptions
            if (containsExtremelyDangerousPatterns(value)) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Content contains potentially dangerous script patterns")
                       .addConstraintViolation();
                return false;
            }
            return true; // Allow description content to pass through
        }
        
        // Use more lenient validation for other content fields
        if (isContentField(fieldName)) {
            result = sqlInjectionValidator.validateCourseContent(value, fieldName);
        } else {
            result = sqlInjectionValidator.validateInput(value, fieldName);
        }
        
        if (!result.isValid()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(result.getErrorMessage())
                   .addConstraintViolation();
            return false;
        }
        
        return true;
    }
    
    /**
     * Check if this field should use lenient content validation
     */
    private boolean isContentField(String fieldName) {
        return fieldName != null && (
            fieldName.toLowerCase().contains("content") ||
            fieldName.toLowerCase().contains("coursecontent") ||
            fieldName.toLowerCase().contains("lessoncontent")
        );
    }
    
    /**
     * Check if this is a description field that should skip SQL injection validation
     */
    private boolean isDescriptionField(String fieldName) {
        return fieldName != null && (
            fieldName.toLowerCase().contains("description") ||
            fieldName.toLowerCase().equals("description") ||
            fieldName.toLowerCase().contains("richdescription") ||
            fieldName.toLowerCase().contains("richcontent")
        );
    }
    
    /**
     * Check for extremely dangerous patterns (only script injection)
     */
    private boolean containsExtremelyDangerousPatterns(String value) {
        if (value == null) return false;
        
        String lowerValue = value.toLowerCase();
        
        // Only check for script injection attempts - allow all other content
        return lowerValue.contains("<script") ||
               lowerValue.contains("javascript:") ||
               lowerValue.contains("vbscript:") ||
               lowerValue.contains("onload=") ||
               lowerValue.contains("onerror=") ||
               lowerValue.contains("onclick=") ||
               lowerValue.contains("onmouseover=");
    }
}
