package com.vedicastrology.controller;

import com.vedicastrology.entity.Login;
import com.vedicastrology.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = {"http://localhost:8100", "http://localhost:4200", "http://localhost:4201"})
public class AdminUserController {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserController.class);

    @Autowired
    private LoginService loginService;

    /**
     * Create a new user (Admin only)
     */
    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createUser(@RequestBody Login login) {
        try {
            return ResponseEntity.ok(loginService.createLogin(login));
        } catch (Exception e) {
            logger.error("💥 Error creating user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Update any user by ID (Admin only)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Login login) {
        try {
            return ResponseEntity.ok(loginService.updateLogin(id, login));
        } catch (Exception e) {
            logger.error("💥 Error updating user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Get any user by ID (Admin only)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(loginService.getLoginById(id));
        } catch (Exception e) {
            logger.error("💥 Error fetching user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Get all users (Admin only)
     */
    @GetMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(loginService.getAllLogins());
        } catch (Exception e) {
            logger.error("💥 Error fetching all users: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * Delete any user by ID (Admin only)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            loginService.deleteLogin(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            logger.error("💥 Error deleting user {}: {}", id, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Search users by query (Admin only)
     */
    @GetMapping("/search")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> searchUsers(@RequestParam("query") String query) {
        try {
            return ResponseEntity.ok(loginService.searchLogins(query));
        } catch (Exception e) {
            logger.error("💥 Error searching users with query '{}': {}", query, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
