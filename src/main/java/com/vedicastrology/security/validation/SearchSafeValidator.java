package com.vedicastrology.security.validation;

import com.vedicastrology.security.SqlInjectionValidator;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 🔍 Validator implementation for search query SQL injection prevention
 */
@Component
public class SearchSafeValidator implements ConstraintValidator<SearchSafe, String> {
    
    @Autowired
    private SqlInjectionValidator sqlInjectionValidator;
    
    private String fieldName;
    private int maxLength;
    
    @Override
    public void initialize(SearchSafe annotation) {
        this.fieldName = annotation.fieldName();
        this.maxLength = annotation.maxLength();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Search queries can be empty (return all results)
        if (value == null || value.trim().isEmpty()) {
            return true;
        }
        
        // Check length
        if (value.length() > maxLength) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                fieldName + " exceeds maximum length of " + maxLength + " characters"
            ).addConstraintViolation();
            return false;
        }
        
        // Validate search query for SQL injection
        SqlInjectionValidator.ValidationResult result = 
            sqlInjectionValidator.validateSearchQuery(value, fieldName);
        
        if (!result.isValid()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(result.getErrorMessage())
                   .addConstraintViolation();
            return false;
        }
        
        return true;
    }
}
