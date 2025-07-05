package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.security.DosProtectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller for monitoring security and DoS protection statistics
 * Only accessible by admin users
 */
@RestController
@RequestMapping("/api/secure/security")
public class SecurityMonitoringController {

    private static final Logger logger = LoggerFactory.getLogger(SecurityMonitoringController.class);
    
    @Autowired
    private DosProtectionService dosProtectionService;

    /**
     * Get DoS protection statistics (Admin only)
     */
    @PostMapping("/dos-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDosStats(@RequestBody(required = false) EmptyRequest request) {
        logger.info("🔍 Admin requesting DoS protection statistics");
        
        try {
            DosProtectionService.SecurityStatistics stats = dosProtectionService.getSecurityStatistics();
            
            Map<String, Object> response = new HashMap<>();
            response.put("totalBlockedIps", stats.getTotalBlockedIps());
            response.put("totalBlockedUsernames", stats.getTotalBlockedUsernames());
            response.put("totalFailedAttempts", stats.getTotalFailedAttempts());
            response.put("timestamp", System.currentTimeMillis());
            
            logger.info("📊 DoS stats - Blocked IPs: {}, Blocked Usernames: {}, Failed Attempts: {}", 
                       stats.getTotalBlockedIps(), stats.getTotalBlockedUsernames(), stats.getTotalFailedAttempts());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("💥 Error retrieving DoS statistics: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve statistics"));
        }
    }

    /**
     * Check security status for current request IP
     */
    @PostMapping("/check-status")
    public ResponseEntity<Map<String, Object>> checkSecurityStatus(
            @RequestBody(required = false) EmptyRequest request,
            HttpServletRequest httpRequest) {
        
        String clientIp = getClientIpAddress(httpRequest);
        logger.debug("🔍 Checking security status for IP: {}", clientIp);
        
        try {
            DosProtectionService.SecurityStatus status = dosProtectionService.getSecurityStatus(clientIp, null);
            
            Map<String, Object> response = new HashMap<>();
            response.put("ipAddress", clientIp);
            response.put("ipFailedAttempts", status.getIpFailedAttempts());
            response.put("ipBlocked", status.isIpBlocked());
            response.put("isBlocked", status.isBlocked());
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("💥 Error checking security status for IP {}: {}", clientIp, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to check security status"));
        }
    }

    /**
     * Test endpoint to simulate failed login attempts (for testing DoS protection)
     * Only available in development mode
     */
    @PostMapping("/test-dos")
    public ResponseEntity<Map<String, Object>> testDosProtection(
            @RequestBody Map<String, String> requestBody,
            HttpServletRequest httpRequest) {
        
        String clientIp = getClientIpAddress(httpRequest);
        String testUsername = requestBody.getOrDefault("username", "test-user");
        String userAgent = httpRequest.getHeader("User-Agent");
        
        logger.warn("🧪 TEST_DOS_PROTECTION: Simulating failed login from IP: {} for username: {}", clientIp, testUsername);
        
        try {
            // Record a failed attempt
            dosProtectionService.recordFailedAttempt(clientIp, testUsername, userAgent);
            
            // Get current status
            DosProtectionService.SecurityStatus status = dosProtectionService.getSecurityStatus(clientIp, testUsername);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Failed login attempt recorded");
            response.put("ipAddress", clientIp);
            response.put("username", testUsername);
            response.put("ipFailedAttempts", status.getIpFailedAttempts());
            response.put("usernameFailedAttempts", status.getUsernameFailedAttempts());
            response.put("ipBlocked", status.isIpBlocked());
            response.put("usernameBlocked", status.isUsernameBlocked());
            response.put("isBlocked", status.isBlocked());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("💥 Error in DoS test for IP {}: {}", clientIp, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to test DoS protection"));
        }
    }

    /**
     * Extract the real client IP address, considering proxy headers
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String[] headerNames = {
            "X-Forwarded-For",
            "X-Real-IP", 
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
        };
        
        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                // X-Forwarded-For can contain multiple IPs, get the first one
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip;
            }
        }
        
        return request.getRemoteAddr();
    }
}
