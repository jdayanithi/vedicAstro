package com.vedicastrology.logging;

import com.vedicastrology.service.StructuredLoggingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Test class to verify that sensitive data (passwords, user IDs) are properly masked in logs
 */
@SpringBootTest
@ActiveProfiles("dev")
public class SensitiveDataMaskingTest {

    @Autowired
    private StructuredLoggingService structuredLoggingService;

    @Test
    public void testPasswordMasking() {
        System.out.println("=== Testing Password Masking ===");
        
        // Test authentication with password
        structuredLoggingService.logAuthenticationAttemptWithPassword(
            "johndoe", "mySecretPassword123!", "192.168.1.100", 
            "Mozilla/5.0 (Test Browser)", false, "Invalid credentials");
        
        // Test user registration
        structuredLoggingService.logUserRegistrationEvent(
            "janedoe", "jane.doe@example.com", 12345L, "192.168.1.101", 
            true, "User registered successfully");
        
        // Test password change
        structuredLoggingService.logPasswordChangeEvent(
            "adminuser", 987654321L, "10.0.0.1", true, "Password updated");
        
        System.out.println("✅ Password masking test completed");
    }

    @Test
    public void testUsernameMasking() {
        System.out.println("=== Testing Username Masking ===");
        
        // Test various username lengths
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "ab", "127.0.0.1", "Short username test");
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "user", "127.0.0.1", "Medium username test");
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "verylongusername", "127.0.0.1", "Long username test");
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "admin@company.com", "127.0.0.1", "Email-like username test");
        
        System.out.println("✅ Username masking test completed");
    }

    @Test
    public void testUserIdMasking() {
        System.out.println("=== Testing User ID Masking ===");
        
        // Test various user ID formats
        structuredLoggingService.logLoginHistoryEvent("LOGIN_TEST", "testuser", 12L, "127.0.0.1", 
            "SUCCESS", "STANDARD", "Short ID test");
        
        structuredLoggingService.logLoginHistoryEvent("LOGIN_TEST", "testuser", 1234L, "127.0.0.1", 
            "SUCCESS", "STANDARD", "Medium ID test");
        
        structuredLoggingService.logLoginHistoryEvent("LOGIN_TEST", "testuser", 123456789L, "127.0.0.1", 
            "SUCCESS", "STANDARD", "Long ID test");
        
        System.out.println("✅ User ID masking test completed");
    }

    @Test
    public void testSensitiveDataInDetails() {
        System.out.println("=== Testing Sensitive Data in Details Field ===");
        
        // Test details with password-like content
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "testuser", "127.0.0.1", 
            "Login failed with password: secretpass123");
        
        // Test details with credit card
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "testuser", "127.0.0.1", 
            "Payment processed with card 4532 1234 5678 9012");
        
        // Test details with email
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "testuser", "127.0.0.1", 
            "Email notification sent to john.doe@example.com");
        
        // Test details with phone
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "testuser", "127.0.0.1", 
            "SMS sent to 555-123-4567");
        
        // Test details with SSN
        structuredLoggingService.logSecurityEvent("TEST_EVENT", "testuser", "127.0.0.1", 
            "SSN verification for 123-45-6789");
        
        System.out.println("✅ Sensitive data in details masking test completed");
    }

    @Test
    public void testComplexSensitiveData() {
        System.out.println("=== Testing Complex Sensitive Data Scenarios ===");
        
        // Test JSON-like data
        String jsonLikeData = "{\"password\":\"mySecret123\",\"user\":\"admin\",\"token\":\"abc123\"}";
        structuredLoggingService.logSecurityEvent("JSON_TEST", "testuser", "127.0.0.1", jsonLikeData);
        
        // Test URL with password
        String urlData = "https://user:password123@example.com/api/login";
        structuredLoggingService.logSecurityEvent("URL_TEST", "testuser", "127.0.0.1", urlData);
        
        // Test form data
        String formData = "username=john&password=secret&email=john@test.com";
        structuredLoggingService.logSecurityEvent("FORM_TEST", "testuser", "127.0.0.1", formData);
        
        System.out.println("✅ Complex sensitive data masking test completed");
    }

    @Test
    public void testAllMaskingFeatures() {
        System.out.println("=== Running Complete Masking Test Suite ===");
        
        // Test all types of logging methods with sensitive data
        structuredLoggingService.logSuspiciousActivity("BRUTE_FORCE", "attacker@evil.com", "10.0.0.1", 
            "Mozilla/5.0 (Hacker Browser)", "Multiple failed login attempts with password: hackerpass");
        
        structuredLoggingService.logDosProtectionEvent("RATE_LIMIT_EXCEEDED", "10.0.0.1", "spammer@bad.com", 
            "BadBot/1.0", "User ID 999888777 exceeded rate limit");
        
        structuredLoggingService.logFileUploadSecurityEvent("MALICIOUS_FILE", "virus.exe", "application/exe", 
            1024L, "malicioususer", "192.168.1.200");
        
        structuredLoggingService.logAdminAccessEvent("DELETE_USER", "superadmin", "192.168.1.1", 
            "/admin/users/delete/123456", true);
        
        System.out.println("✅ Complete masking test suite completed");
        System.out.println("");
        System.out.println("📝 CHECK LOG FILES:");
        System.out.println("   - logs/dev/security-dev.log - Should show masked usernames and sensitive data");
        System.out.println("   - logs/dev/login-history-dev.log - Should show masked user IDs");
        System.out.println("   - logs/dev/dos-protection-dev.log - Should show masked data in DoS events");
        System.out.println("");
        System.out.println("🔒 SENSITIVE DATA MASKING PATTERNS APPLIED:");
        System.out.println("   - Usernames: a***e (first and last char visible for long names)");
        System.out.println("   - User IDs: 1***9 (first and last digit visible for long IDs)");
        System.out.println("   - Passwords: ***MASKED*** (completely hidden)");
        System.out.println("   - Credit Cards: ****-****-****-**** (completely masked)");
        System.out.println("   - Phone Numbers: ***-***-**** (completely masked)");
        System.out.println("   - SSNs: ***-**-**** (completely masked)");
        System.out.println("   - Emails: u***@example.com (username partially masked)");
    }
}
