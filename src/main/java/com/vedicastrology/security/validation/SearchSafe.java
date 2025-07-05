package com.vedicastrology.security.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 🔍 Annotation to validate search queries for SQL injection attempts
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SearchSafeValidator.class)
public @interface SearchSafe {
    String message() default "Search query contains potentially dangerous content";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    
    /**
     * Field name for logging purposes
     */
    String fieldName() default "searchQuery";
    
    /**
     * Maximum allowed length for search queries
     */
    int maxLength() default 100;
}
