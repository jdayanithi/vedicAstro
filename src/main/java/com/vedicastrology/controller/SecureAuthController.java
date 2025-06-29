package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.EmptyRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/secure")
public class SecureAuthController {

    private static final Logger logger = LoggerFactory.getLogger(SecureAuthController.class);

    @PostMapping("/validate-token")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestBody(required = false) EmptyRequest request) {
        try {
            logger.info("🔍 Validating token");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Map<String, Object> response = new HashMap<>();
            
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                response.put("valid", true);
                response.put("userId", authentication.getName());
                logger.info("✅ Token validated for user: {}", authentication.getName());
                return ResponseEntity.ok(response);
            } else {
                response.put("valid", false);
                response.put("message", "No valid authentication found");
                logger.warn("❌ Invalid authentication attempt");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            logger.error("💥 Error validating token: {}", e.getMessage(), e);
            Map<String, Object> response = new HashMap<>();
            response.put("valid", false);
            response.put("message", "Token validation failed");
            return ResponseEntity.status(401).body(response);
        }
    }
}
