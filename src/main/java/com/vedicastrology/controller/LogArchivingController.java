package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import com.vedicastrology.service.LogArchivingService;
import com.vedicastrology.service.StructuredLoggingService;
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
 * Controller for managing log archiving operations
 * Only accessible by admin users
 */
@RestController
@RequestMapping("/api/secure/logs")
public class LogArchivingController {

    private static final Logger logger = LoggerFactory.getLogger(LogArchivingController.class);
    
    @Autowired
    private LogArchivingService logArchivingService;
    
    @Autowired
    private StructuredLoggingService structuredLoggingService;

    /**
     * Get log archiving status and configuration (Admin only)
     */
    @PostMapping("/archiving/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getArchivingStatus(
            @RequestBody(required = false) EmptyRequest request,
            HttpServletRequest httpRequest) {
        
        String clientIp = getClientIpAddress(httpRequest);
        String username = "admin"; // Get from security context if available
        
        logger.info("📊 Admin requesting log archiving status");
        
        // Log admin access event
        structuredLoggingService.logAdminAccessEvent("VIEW_LOG_ARCHIVING_STATUS", username, clientIp, 
            "Log Archiving Status", true);
        
        try {
            LogArchivingService.ArchivingStatus status = logArchivingService.getArchivingStatus();
            
            Map<String, Object> response = new HashMap<>();
            response.put("enabled", status.enabled);
            response.put("sizeThreshold", status.sizeThreshold);
            response.put("archiveFolder", status.archiveFolder);
            response.put("checkInterval", status.checkInterval);
            response.put("compressionEnabled", status.compressionEnabled);
            response.put("archivedFileCount", status.archivedFileCount);
            response.put("timestamp", System.currentTimeMillis());
            
            logger.info("📋 Archiving status - Enabled: {}, Threshold: {}, Archived Files: {}", 
                       status.enabled, status.sizeThreshold, status.archivedFileCount);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("💥 Error retrieving archiving status: {}", e.getMessage(), e);
            
            // Log security event for failed admin access
            structuredLoggingService.logSecurityEvent("ADMIN_ACCESS_ERROR", username, clientIp, 
                "Failed to retrieve log archiving status: " + e.getMessage());
            
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve archiving status"));
        }
    }

    /**
     * Manually trigger log archiving (Admin only)
     */
    @PostMapping("/archiving/trigger")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> triggerArchiving(
            @RequestBody(required = false) EmptyRequest request,
            HttpServletRequest httpRequest) {
        
        String clientIp = getClientIpAddress(httpRequest);
        String username = "admin"; // Get from security context if available
        
        logger.info("🔄 Admin manually triggering log archiving");
        
        // Log admin access event
        structuredLoggingService.logAdminAccessEvent("TRIGGER_LOG_ARCHIVING", username, clientIp, 
            "Manual Log Archiving Trigger", true);
        
        try {
            logArchivingService.triggerArchiving();
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Log archiving triggered successfully");
            response.put("timestamp", System.currentTimeMillis());
            
            logger.info("✅ Log archiving triggered successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("💥 Error triggering log archiving: {}", e.getMessage(), e);
            
            // Log security event for failed admin access
            structuredLoggingService.logSecurityEvent("ADMIN_ACCESS_ERROR", username, clientIp, 
                "Failed to trigger log archiving: " + e.getMessage());
            
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to trigger log archiving"));
        }
    }

    /**
     * Get current log file sizes (Admin only)
     */
    @PostMapping("/files/sizes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getLogFileSizes(
            @RequestBody(required = false) EmptyRequest request,
            HttpServletRequest httpRequest) {
        
        String clientIp = getClientIpAddress(httpRequest);
        String username = "admin"; // Get from security context if available
        
        logger.debug("📏 Admin requesting log file sizes");
        
        // Log admin access event
        structuredLoggingService.logAdminAccessEvent("VIEW_LOG_FILE_SIZES", username, clientIp, 
            "Log File Sizes", true);
        
        try {
            Map<String, Object> fileSizes = new HashMap<>();
            
            // This would need to be implemented to check actual file sizes
            // For now, return a placeholder response
            fileSizes.put("security", "45KB");
            fileSizes.put("performance", "23KB");
            fileSizes.put("dosProtection", "18KB");
            fileSizes.put("loginHistory", "67KB");
            fileSizes.put("main", "89KB");
            fileSizes.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(fileSizes);
        } catch (Exception e) {
            logger.error("💥 Error retrieving log file sizes: {}", e.getMessage(), e);
            
            // Log security event for failed admin access
            structuredLoggingService.logSecurityEvent("ADMIN_ACCESS_ERROR", username, clientIp, 
                "Failed to retrieve log file sizes: " + e.getMessage());
            
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to retrieve log file sizes"));
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
