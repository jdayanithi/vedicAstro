package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Test controller for demonstrating AOP performance monitoring
 * Contains endpoints with different response times to test the aspect
 */
@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:4200"})
public class TestPerformanceController {

    private static final Logger logger = LoggerFactory.getLogger(TestPerformanceController.class);

    /**
     * Fast endpoint - should complete quickly
     */
    @PostMapping("/fast")
    public ResponseEntity<Map<String, Object>> fastEndpoint(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🚀 Fast endpoint called");
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This endpoint responds quickly");
        response.put("timestamp", System.currentTimeMillis());
        response.put("type", "fast");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Slow endpoint - will trigger the AOP warning
     */
    @PostMapping("/slow")
    public ResponseEntity<Map<String, Object>> slowEndpoint(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🐌 Slow endpoint called - simulating slow operation");
        
        try {
            // Simulate a slow database query or external API call
            Thread.sleep(1500); // 1.5 seconds - exceeds the 1 second threshold
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.warn("Sleep interrupted: {}", e.getMessage());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This endpoint deliberately takes more than 1 second");
        response.put("timestamp", System.currentTimeMillis());
        response.put("type", "slow");
        response.put("simulatedDelay", "1500ms");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Very slow endpoint - will definitely trigger the AOP warning
     */
    @PostMapping("/very-slow")
    public ResponseEntity<Map<String, Object>> verySlowEndpoint(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🦥 Very slow endpoint called - simulating very slow operation");
        
        try {
            // Simulate a very slow operation
            Thread.sleep(3000); // 3 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.warn("Sleep interrupted: {}", e.getMessage());
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "This endpoint takes 3+ seconds to respond");
        response.put("timestamp", System.currentTimeMillis());
        response.put("type", "very-slow");
        response.put("simulatedDelay", "3000ms");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Error endpoint - will trigger AOP error logging
     */
    @PostMapping("/error")
    public ResponseEntity<Map<String, Object>> errorEndpoint(@RequestBody(required = false) EmptyRequest request) {
        logger.info("💥 Error endpoint called - will throw exception");
        
        // Simulate processing time before error
        try {
            Thread.sleep(500); // 0.5 seconds before failing
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        throw new RuntimeException("This is a test exception to demonstrate AOP error logging");
    }
}
