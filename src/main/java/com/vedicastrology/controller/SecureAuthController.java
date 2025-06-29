package com.vedicastrology.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/secure")
public class SecureAuthController {

    @GetMapping("/validate-token")
    public ResponseEntity<Map<String, Object>> validateToken() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Map<String, Object> response = new HashMap<>();
            
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                response.put("valid", true);
                response.put("userId", authentication.getName());
                return ResponseEntity.ok(response);
            } else {
                response.put("valid", false);
                response.put("message", "No valid authentication found");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("valid", false);
            response.put("message", "Token validation failed");
            return ResponseEntity.status(401).body(response);
        }
    }
}
