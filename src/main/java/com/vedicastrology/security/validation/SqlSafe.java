package com.vedicastrology.security.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 🛡️ Annotation to validate input for SQL injection attempts
 */
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SqlSafeValidator.class)
public @interface SqlSafe {
    String message() default "Input contains potentially dangerous content";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    
    /**
     * Field name for logging purposes
     */
    String fieldName() default "input";
    
    /**
     * Maximum allowed length
     */
    int maxLength() default 255;
    
    /**
     * Allow empty values
     */
    boolean allowEmpty() default false;
}
