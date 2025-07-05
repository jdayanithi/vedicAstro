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
        SqlInjectionValidator.ValidationResult result = 
            sqlInjectionValidator.validateInput(value, fieldName);
        
        if (!result.isValid()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(result.getErrorMessage())
                   .addConstraintViolation();
            return false;
        }
        
        return true;
    }
}
