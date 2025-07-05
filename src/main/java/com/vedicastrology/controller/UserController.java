package com.vedicastrology.controller;

import com.vedicastrology.dto.request.SecureRequestDTOs.SecureSearchRequest;
import com.vedicastrology.security.InputSanitizationService;
import com.vedicastrology.service.LoginService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/secure/users")
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private LoginService loginService;
    
    @Autowired
    private InputSanitizationService inputSanitizationService;
    
    @PostMapping("/search")
    public ResponseEntity<?> searchUsers(@Valid @RequestBody SecureSearchRequest request) {
        try {
            // Additional sanitization layer (belt and suspenders approach)
            String sanitizedQuery = inputSanitizationService.sanitizeSearchQuery(
                request.getQuery(), "userSearchQuery");
            
            logger.info("🔍 Searching users with sanitized query: '{}'", sanitizedQuery);
            
            List<UserSearchResponse> users = loginService.searchUsers(sanitizedQuery)
                .stream()
                .map(login -> new UserSearchResponse(
                    login.getId(),
                    inputSanitizationService.sanitizeForDisplay(login.getFirstName(), "firstName"),
                    inputSanitizationService.sanitizeForDisplay(login.getLastName(), "lastName"),
                    inputSanitizationService.sanitizeForDisplay(login.getUsername(), "username"),
                    login.getUserType().toString()
                ))
                .collect(Collectors.toList());
                
            logger.info("✅ Found {} users matching query", users.size());
            return ResponseEntity.ok(users);
            
        } catch (SecurityException e) {
            logger.error("🚨 SECURITY_VIOLATION in user search: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Invalid search parameters: " + e.getMessage());
        } catch (Exception e) {
            logger.error("💥 Error searching users: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body("Search operation failed");
        }
    }
}

class UserSearchResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String userType;

    public UserSearchResponse(Long id, String firstName, String lastName, String email, String userType) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userType = userType;
    }

    // Getters
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getUserType() { return userType; }
}
