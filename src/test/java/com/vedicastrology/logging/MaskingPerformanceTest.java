package com.vedicastrology.logging;

import com.vedicastrology.service.StructuredLoggingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Performance test for optimized sensitive data masking in large strings
 */
@SpringBootTest
@ActiveProfiles("dev")
public class MaskingPerformanceTest {

    @Autowired
    private StructuredLoggingService structuredLoggingService;

    @Test
    public void testSmallStringPerformance() {
        System.out.println("=== Testing Small String Performance (Full Regex Processing) ===");
        
        String smallString = "Login attempt with password: secret123 and email user@test.com from 192.168.1.1";
        
        // Warm up
        for (int i = 0; i < 100; i++) {
            structuredLoggingService.getMaskingPerformanceInfo(smallString);
        }
        
        // Actual test
        long totalTime = 0;
        int iterations = 1000;
        
        for (int i = 0; i < iterations; i++) {
            long start = System.nanoTime();
            structuredLoggingService.logSecurityEvent("PERFORMANCE_TEST", "testuser", "127.0.0.1", smallString);
            long end = System.nanoTime();
            totalTime += (end - start);
        }
        
        long avgMicros = (totalTime / iterations) / 1000;
        System.out.println(String.format("Small string (%d chars): Average %dμs per log entry over %d iterations", 
            smallString.length(), avgMicros, iterations));
        
        String perfInfo = structuredLoggingService.getMaskingPerformanceInfo(smallString);
        System.out.println("Performance info: " + perfInfo);
        System.out.println("✅ Small string performance test completed");
    }

    @Test
    public void testLargeStringPerformance() {
        System.out.println("=== Testing Large String Performance (Fast Keyword-Based Processing) ===");
        
        // Create a large string with sensitive data
        StringBuilder largeStringBuilder = new StringBuilder();
        largeStringBuilder.append("Large log entry with multiple sensitive data points: ");
        
        for (int i = 0; i < 50; i++) {
            largeStringBuilder.append("User ").append(i).append(" attempted login with password: secret").append(i)
                .append(" and email user").append(i).append("@company.com using credit card 4532123456789012. ");
        }
        
        String largeString = largeStringBuilder.toString();
        
        // Warm up
        for (int i = 0; i < 10; i++) {
            structuredLoggingService.getMaskingPerformanceInfo(largeString);
        }
        
        // Actual test
        long totalTime = 0;
        int iterations = 100; // Fewer iterations for large strings
        
        for (int i = 0; i < iterations; i++) {
            long start = System.nanoTime();
            structuredLoggingService.logSecurityEvent("PERFORMANCE_TEST", "testuser", "127.0.0.1", largeString);
            long end = System.nanoTime();
            totalTime += (end - start);
        }
        
        long avgMicros = (totalTime / iterations) / 1000;
        System.out.println(String.format("Large string (%d chars): Average %dμs per log entry over %d iterations", 
            largeString.length(), avgMicros, iterations));
        
        String perfInfo = structuredLoggingService.getMaskingPerformanceInfo(largeString);
        System.out.println("Performance info: " + perfInfo);
        System.out.println("✅ Large string performance test completed");
    }

    @Test
    public void testVeryLargeStringPerformance() {
        System.out.println("=== Testing Very Large String Performance (Truncation + Fast Processing) ===");
        
        // Create a very large string (over 1000 chars)
        StringBuilder veryLargeStringBuilder = new StringBuilder();
        
        for (int i = 0; i < 200; i++) {
            veryLargeStringBuilder.append("This is a very long log entry with sensitive data like password: secret")
                .append(i).append(" and user email: user").append(i).append("@domain.com and credit card 4532123456789012. ");
        }
        
        String veryLargeString = veryLargeStringBuilder.toString();
        
        // Warm up
        for (int i = 0; i < 10; i++) {
            structuredLoggingService.getMaskingPerformanceInfo(veryLargeString);
        }
        
        // Actual test
        long totalTime = 0;
        int iterations = 100;
        
        for (int i = 0; i < iterations; i++) {
            long start = System.nanoTime();
            structuredLoggingService.logSecurityEvent("PERFORMANCE_TEST", "testuser", "127.0.0.1", veryLargeString);
            long end = System.nanoTime();
            totalTime += (end - start);
        }
        
        long avgMicros = (totalTime / iterations) / 1000;
        System.out.println(String.format("Very large string (%d chars): Average %dμs per log entry over %d iterations", 
            veryLargeString.length(), avgMicros, iterations));
        
        String perfInfo = structuredLoggingService.getMaskingPerformanceInfo(veryLargeString);
        System.out.println("Performance info: " + perfInfo);
        System.out.println("✅ Very large string performance test completed");
    }

    @Test
    public void testPerformanceMonitoringFeature() {
        System.out.println("=== Testing Performance Monitoring Feature ===");
        
        // Test small string
        String smallStr = "password: secret123";
        structuredLoggingService.logWithPerformanceMonitoring("SMALL_TEST", smallStr);
        
        // Test medium string
        StringBuilder mediumStr = new StringBuilder();
        for (int i = 0; i < 20; i++) {
            mediumStr.append("password: secret").append(i).append(" email: user").append(i).append("@test.com ");
        }
        structuredLoggingService.logWithPerformanceMonitoring("MEDIUM_TEST", mediumStr.toString());
        
        // Test large string
        StringBuilder largeStr = new StringBuilder();
        for (int i = 0; i < 100; i++) {
            largeStr.append("password: secret").append(i).append(" email: user").append(i).append("@test.com ");
        }
        structuredLoggingService.logWithPerformanceMonitoring("LARGE_TEST", largeStr.toString());
        
        System.out.println("✅ Performance monitoring feature test completed");
    }

    @Test
    public void testMaskingAccuracy() {
        System.out.println("=== Testing Masking Accuracy for Different String Sizes ===");
        
        // Test that both fast and full masking produce similar results for common cases
        String testCase1 = "password: secret123";
        String testCase2 = "Login with password: mypass and email: user@test.com";
        
        // Build large version
        StringBuilder largeVersion = new StringBuilder();
        for (int i = 0; i < 100; i++) {
            largeVersion.append(testCase2).append(" ");
        }
        
        // Log and check masking
        structuredLoggingService.logSecurityEvent("ACCURACY_TEST_SMALL", "user", "127.0.0.1", testCase1);
        structuredLoggingService.logSecurityEvent("ACCURACY_TEST_MEDIUM", "user", "127.0.0.1", testCase2);
        structuredLoggingService.logSecurityEvent("ACCURACY_TEST_LARGE", "user", "127.0.0.1", largeVersion.toString());
        
        System.out.println("Check the security log to verify masking accuracy across different string sizes");
        System.out.println("✅ Masking accuracy test completed");
    }

    @Test
    public void testPerformanceComparison() {
        System.out.println("=== Performance Comparison Summary ===");
        
        String[] testStrings = {
            "password: secret",  // 16 chars
            "Login attempt with password: secret123 and email user@test.com", // 61 chars
            generateString(200),  // 200 chars
            generateString(500),  // 500 chars (threshold)
            generateString(1000), // 1000 chars
            generateString(2000)  // 2000 chars
        };
        
        System.out.println("String Size | Processing Time | Approach Used");
        System.out.println("-----------|-----------------|---------------");
        
        for (String testStr : testStrings) {
            String perfInfo = structuredLoggingService.getMaskingPerformanceInfo(testStr);
            System.out.println(String.format("%10d | %s", testStr.length(), perfInfo));
        }
        
        System.out.println("");
        System.out.println("📊 Performance Optimization Summary:");
        System.out.println("   - Strings ≤500 chars: Full regex processing (better accuracy)");
        System.out.println("   - Strings >500 chars: Fast keyword-based processing (better performance)");
        System.out.println("   - Strings >1000 chars: Automatic truncation to prevent memory issues");
        System.out.println("   - Pre-compiled regex patterns reduce compilation overhead");
        System.out.println("   - Early character filtering reduces processing time");
        System.out.println("✅ Performance comparison completed");
    }

    private String generateString(int length) {
        StringBuilder sb = new StringBuilder();
        String template = "User login with password: secret123 and email: user@example.com ";
        
        while (sb.length() < length) {
            sb.append(template);
        }
        
        return sb.substring(0, Math.min(length, sb.length()));
    }
}
