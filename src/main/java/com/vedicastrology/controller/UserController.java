package com.vedicastrology.controller;


import com.vedicastrology.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/secure/users")
public class UserController {
    
    @Autowired
    private LoginService loginService;
    
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String query) {
        try {
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
            return ResponseEntity.ok(users);
        } catch (Exception e) {
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
