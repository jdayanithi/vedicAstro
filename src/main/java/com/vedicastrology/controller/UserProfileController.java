package com.vedicastrology.controller;

import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.entity.Login;
import com.vedicastrology.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:4200", "http://localhost:4201"})
public class UserProfileController {

    private static final Logger logger = LoggerFactory.getLogger(UserProfileController.class);

    @Autowired
    private LoginService loginService;

    /**
     * Get current user's profile using JWT token
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                
                Long userId = Long.parseLong(authentication.getName());
                Login login = loginService.getLoginById(userId);
                
                Map<String, Object> profile = new HashMap<>();
                profile.put("userId", login.getId());
                profile.put("username", login.getUsername());
                profile.put("role", login.getRole());
                profile.put("firstName", login.getFirstName());
                profile.put("lastName", login.getLastName());
                profile.put("birthDate", login.getBirthDate());
                profile.put("birthTime", login.getBirthTime());
                profile.put("birthPlace", login.getBirthPlace());
                profile.put("profilePicture", login.getProfilePicture());
                profile.put("bio", login.getBio());
                profile.put("userType", login.getUserType() != null ? login.getUserType().name() : null);
                profile.put("zodiacSign", login.getZodiacSign());
                profile.put("risingSign", login.getRisingSign());
                profile.put("moonSign", login.getMoonSign());
                
                return ResponseEntity.ok(profile);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
            }
        } catch (Exception e) {
            logger.error("💥 Error fetching user profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
        }
    }

    /**
     * Update current user's profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody Login profileUpdate) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                
                Long userId = Long.parseLong(authentication.getName());
                
                // Set the ID to ensure we're updating the correct user
                profileUpdate.setId(userId);
                
                Login updatedLogin = loginService.updateLogin(userId, profileUpdate);
                
                Map<String, Object> profile = new HashMap<>();
                profile.put("userId", updatedLogin.getId());
                profile.put("username", updatedLogin.getUsername());
                profile.put("role", updatedLogin.getRole());
                profile.put("firstName", updatedLogin.getFirstName());
                profile.put("lastName", updatedLogin.getLastName());
                profile.put("birthDate", updatedLogin.getBirthDate());
                profile.put("birthTime", updatedLogin.getBirthTime());
                profile.put("birthPlace", updatedLogin.getBirthPlace());
                profile.put("profilePicture", updatedLogin.getProfilePicture());
                profile.put("bio", updatedLogin.getBio());
                profile.put("userType", updatedLogin.getUserType() != null ? updatedLogin.getUserType().name() : null);
                profile.put("zodiacSign", updatedLogin.getZodiacSign());
                profile.put("risingSign", updatedLogin.getRisingSign());
                profile.put("moonSign", updatedLogin.getMoonSign());
                
                return ResponseEntity.ok(profile);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
            }
        } catch (Exception e) {
            logger.error("💥 Error updating user profile: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Update failed", e.getMessage()));
        }
    }

    /**
     * Get current user's basic info (minimal data)
     */
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                
                Long userId = Long.parseLong(authentication.getName());
                Login login = loginService.getLoginById(userId);
                
                Map<String, Object> info = new HashMap<>();
                info.put("userId", login.getId());
                info.put("username", login.getUsername());
                info.put("role", login.getRole());
                info.put("firstName", login.getFirstName());
                info.put("lastName", login.getLastName());
                info.put("userType", login.getUserType() != null ? login.getUserType().name() : null);
                
                return ResponseEntity.ok(info);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
            }
        } catch (Exception e) {
            logger.error("💥 Error fetching user info: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
        }
    }

    /**
     * Delete current user's account
     */
    @DeleteMapping("/account")
    public ResponseEntity<?> deleteAccount() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && 
                !authentication.getName().equals("anonymousUser")) {
                
                Long userId = Long.parseLong(authentication.getName());
                loginService.deleteLogin(userId);
                
                return ResponseEntity.ok(Map.of("message", "Account deleted successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication failed", "Token expired or invalid"));
            }
        } catch (Exception e) {
            logger.error("💥 Error deleting user account: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Deletion failed", e.getMessage()));
        }
    }
}
