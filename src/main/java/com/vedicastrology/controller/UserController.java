package com.vedicastrology.controller;

import com.vedicastrology.dto.request.CommonRequestDTOs.SearchRequest;
import com.vedicastrology.service.LoginService;
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
    
    @PostMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestBody SearchRequest request) {
        String query = request.getQuery();
        try {
            logger.info("🔍 Searching users with query: '{}'", query);
            List<UserSearchResponse> users = loginService.searchUsers(query)
                .stream()
                .map(login -> new UserSearchResponse(
                    login.getId(),
                    login.getFirstName(),
                    login.getLastName(),
                    login.getUsername(),
                    login.getUserType().toString()
                ))
                .collect(Collectors.toList());
            logger.info("✅ Found {} users matching query: '{}'", users.size(), query);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("💥 Error searching users with query '{}': {}", query, e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
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
