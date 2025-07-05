package com.vedicastrology.logging;

import com.vedicastrology.service.StructuredLoggingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Test class to verify logging configuration and structured logging functionality
 */
@SpringBootTest
@ActiveProfiles("dev")
public class LoggingConfigurationTest {

    @Autowired
    private StructuredLoggingService structuredLoggingService;

    @Test
    public void testStructuredLogging() {
        // Test different types of structured logging
        
        // Security event logging
        structuredLoggingService.logSecurityEvent("TEST_SECURITY_EVENT", "test-user", "127.0.0.1", 
            "This is a test security event to verify logging configuration");
        
        // Authentication attempt logging
        structuredLoggingService.logAuthenticationAttempt("test-user", "127.0.0.1", 
            "Mozilla/5.0 (Test Browser)", true, "Test successful login");
        
        structuredLoggingService.logAuthenticationAttempt("test-user", "127.0.0.1", 
            "Mozilla/5.0 (Test Browser)", false, "Test failed login");
        
        // Performance event logging
        structuredLoggingService.logPerformanceEvent("TestController.testMethod", 1500L, 
            "Test performance logging with slow execution time");
        
        // DoS protection event logging
        structuredLoggingService.logDosProtectionEvent("TEST_DOS_EVENT", "127.0.0.1", "test-user", 
            "Mozilla/5.0 (Test Browser)", "Test DoS protection event");
        
        // Login history event logging
        structuredLoggingService.logLoginHistoryEvent("LOGIN_TEST", "test-user", 123L, "127.0.0.1", 
            "SUCCESS", "STANDARD", "Test login history event");
        
        // Admin access event logging
        structuredLoggingService.logAdminAccessEvent("TEST_ADMIN_ACTION", "admin-user", "127.0.0.1", 
            "Test Resource", true);
        
        // Rate limiting event logging
        structuredLoggingService.logRateLimitingEvent("RATE_LIMIT_EXCEEDED", "127.0.0.1", 
            "/api/test", 100, "1 minute");
        
        System.out.println("✅ Structured logging test completed. Check the following log files:");
        System.out.println("   - logs/dev/security-dev.log");
        System.out.println("   - logs/dev/performance-dev.log");
        System.out.println("   - logs/dev/dos-protection-dev.log");
        System.out.println("   - logs/dev/login-history-dev.log");
        System.out.println("   - logs/dev/vedicastro-dev.log");
    }
}
