package com.vedicastrology.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/secure/debug")
public class DebugController {

    @PostMapping("/auth-info")
    public ResponseEntity<?> getAuthInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> authInfo = new HashMap<>();
        authInfo.put("principal", auth != null ? auth.getPrincipal() : null);
        authInfo.put("authorities", auth != null ? auth.getAuthorities() : null);
        authInfo.put("isAuthenticated", auth != null ? auth.isAuthenticated() : false);
        authInfo.put("name", auth != null ? auth.getName() : null);
        
        return ResponseEntity.ok(authInfo);
    }
}
