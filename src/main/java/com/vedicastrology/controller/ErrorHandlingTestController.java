package com.vedicastrology.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

/**
 * Test controller to demonstrate secure error handling
 * This controller should be removed in production
 */
@RestController
@RequestMapping("/api/test/error-handling")
public class ErrorHandlingTestController {

    // Test validation errors
    @PostMapping("/validation-test")
    public String testValidation(@Valid @RequestBody TestRequest request) {
        return "Validation passed: " + request.getEmail();
    }

    // Test authentication error simulation
    @PostMapping("/auth-test")
    public String testAuth() {
        throw new org.springframework.security.authentication.BadCredentialsException("Invalid credentials");
    }

    // Test authorization error simulation
    @PostMapping("/access-test")
    public String testAccess() {
        throw new org.springframework.security.access.AccessDeniedException("Access denied");
    }

    // Test file size error simulation
    @PostMapping("/file-size-test")
    public String testFileSize() {
        throw new org.springframework.web.multipart.MaxUploadSizeExceededException(5000000);
    }

    // Test database error simulation
    @PostMapping("/database-test")
    public String testDatabase() {
        throw new org.springframework.dao.DataAccessResourceFailureException("Database connection failed");
    }

    // Test security error simulation
    @PostMapping("/security-test")
    public String testSecurity() {
        throw new SecurityException("Security violation detected");
    }

    // Test generic runtime error
    @PostMapping("/runtime-test")
    public String testRuntime() {
        throw new RuntimeException("Unexpected runtime error");
    }

    // Test illegal argument error
    @PostMapping("/argument-test")
    public String testArgument() {
        throw new IllegalArgumentException("Invalid argument provided");
    }

    // Test type mismatch (use path variable with wrong type)
    @GetMapping("/type-test/{id}")
    public String testTypeMismatch(@PathVariable Long id) {
        return "ID: " + id;
    }

    // Request DTO for validation testing
    public static class TestRequest {
        @NotBlank(message = "Name is required")
        private String name;

        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is required")
        private String email;

        @Positive(message = "Amount must be positive")
        private BigDecimal amount;

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
    }
}
