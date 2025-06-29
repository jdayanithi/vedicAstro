package com.vedicastrology.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.vedicastrology.config.JwtService;
import com.vedicastrology.dto.response.ErrorResponse;
import com.vedicastrology.entity.Login;
import com.vedicastrology.entity.UserType;
import com.vedicastrology.service.EmailService;
import com.vedicastrology.service.GoogleJwtService;
import com.vedicastrology.service.LoginService;
import com.vedicastrology.util.PasswordGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;    @Autowired
    private GoogleJwtService googleJwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordGenerator passwordGenerator;

    @PostMapping
    public ResponseEntity<?> createLogin(@RequestBody Login login) {
        try {
            return ResponseEntity.ok(loginService.createLogin(login));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLogin(@PathVariable Long id, @RequestBody Login login) {
        try {
            return ResponseEntity.ok(loginService.updateLogin(id, login));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogin(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(loginService.getLoginById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllLogins() {
        try {
            return ResponseEntity.ok(loginService.getAllLogins());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLogin(@PathVariable Long id) {
        try {
            loginService.deleteLogin(id);
            return ResponseEntity.ok("Login deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }    @PostMapping("/validate")
    public ResponseEntity<?> validateLogin(@RequestBody Login loginRequest) {
        logger.info("🔐 Login attempt for username: {}", loginRequest.getUsername());
        
        try {
            Login login = loginService.validateLogin(loginRequest.getUsername(), loginRequest.getPassword());
            logger.info("✅ Login successful for user: {} (ID: {})", login.getUsername(), login.getId());
              // Create UserDetails for JWT token generation
            UserDetails userDetails = User.builder()
                .username(login.getId().toString()) // Use user ID as username in JWT
                .password(login.getPassword())
                .roles(login.getRole())
                .build();
              // Generate JWT token
            String token = jwtService.generateToken(userDetails);
              // Create response with token and user details
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", login.getId()); // Add user ID
            response.put("username", login.getUsername());
            response.put("role", login.getRole());
            response.put("firstName", login.getFirstName());
            response.put("lastName", login.getLastName());
            response.put("birthDate", login.getBirthDate());
            response.put("birthTime", login.getBirthTime());
            response.put("birthPlace", login.getBirthPlace());
            response.put("profilePicture", login.getProfilePicture());
            response.put("bio", login.getBio());
            response.put("userType", login.getUserType() != null ? login.getUserType().name() : null);
            response.put("zodiacSign", login.getZodiacSign());
            response.put("risingSign", login.getRisingSign());
            response.put("moonSign", login.getMoonSign());
              return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("❌ Authentication failed for username: {} - {}", loginRequest.getUsername(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Authentication failed", e.getMessage()));
        } catch (Exception e) {
            logger.error("💥 Server error during login for username: {} - {}", loginRequest.getUsername(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/encode-password")
    public ResponseEntity<?> encodePassword(@RequestBody String password) {
        try {
            String encodedPassword = passwordEncoder.encode(password);
            return ResponseEntity.ok(encodedPassword);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Encoding failed", e.getMessage()));
        }
    }

    @PostMapping("/validate-password")
    public ResponseEntity<?> validatePassword(@RequestBody PasswordValidationRequest request) {
        try {
            System.out.println("Received validation request:");
            System.out.println("Raw password length: " + (request.getRawPassword() != null ? request.getRawPassword().length() : "null"));
            System.out.println("Encoded password: " + request.getEncodedPassword());
            
            boolean isValid = loginService.validatePassword(request.getRawPassword(), request.getEncodedPassword());
            
            Map<String, Object> response = new HashMap<>();
            response.put("isValid", isValid);
            response.put("rawPasswordLength", request.getRawPassword() != null ? request.getRawPassword().length() : 0);
            response.put("encodedPasswordFormat", request.getEncodedPassword().substring(0, Math.min(7, request.getEncodedPassword().length())));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Validation failed", e.getMessage()));
        }
    }

    @PostMapping("/test-password")
    public Map<String, Object> testPassword(@RequestBody String rawPassword) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        boolean isValid = loginService.validatePassword(rawPassword, encodedPassword);
        
        Map<String, Object> response = new HashMap<>();
        response.put("rawPassword", rawPassword);
        response.put("encodedPassword", encodedPassword);
        response.put("isValid", isValid);
        return response;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchLogins(@RequestParam("query") String query) {
        try {
            return ResponseEntity.ok(loginService.searchLogins(query));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        logger.info("🔍 Google login request received");
        
        try {
            String googleToken = request.get("token");
            logger.debug("📝 Received token: {}", googleToken != null ? "Present (length: " + googleToken.length() + ")" : "NULL");
            
            if (googleToken == null || googleToken.isEmpty()) {
                logger.error("❌ Google token is missing or empty");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Bad Request", "Google token is required"));
            }

            logger.info("🔐 Starting Google JWT token verification...");
            
            // Verify Google JWT token
            GoogleIdToken.Payload payload = googleJwtService.verifyGoogleToken(googleToken);
            logger.info("✅ Google JWT token verified successfully");
            
            // Extract user information from Google token
            String email = payload.getEmail();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");
            String googleId = payload.getSubject();            // Check if user exists in database, if not create new user
            Login existingLogin = null;
            try {
                existingLogin = loginService.findByUsername(email);            } catch (RuntimeException e) {
                // User doesn't exist, create new one
                logger.info("🔔 Creating new Google OAuth user for email: {}", email);
                
                // Generate a secure password for backup access
                String generatedPassword = passwordGenerator.generateSecurePassword();
                logger.debug("🔐 Generated secure password for new user");
                
                Login newLogin = new Login();
                newLogin.setUsername(email);
                newLogin.setFirstName(firstName);
                newLogin.setLastName(lastName);
                newLogin.setRole("student"); // Default role for Google users
                newLogin.setUserType(UserType.student); // Set UserType enum
                newLogin.setPassword(generatedPassword); // Use generated password (will be encoded in service)
                newLogin.setGoogleId(googleId); // Store Google ID
                newLogin.setPhoneNumber(null); // Make phone number nullable for Google users
                
                try {
                    existingLogin = loginService.createLogin(newLogin);
                    logger.info("✅ Successfully created new user with ID: {}", existingLogin.getId());
                    
                    // Send welcome email with account details in the background
                    try {
                        emailService.sendWelcomeEmailToGoogleUser(email, firstName, lastName, generatedPassword);
                        logger.info("📧 Welcome email sent successfully to: {}", email);
                    } catch (Exception emailEx) {
                        // Log email error but don't fail the login process
                        logger.error("⚠️ Failed to send welcome email to {}, but user creation succeeded: {}", 
                                   email, emailEx.getMessage());
                    }
                    
                } catch (Exception createEx) {
                    logger.error("💥 Failed to create new Google user: {}", createEx.getMessage(), createEx);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("Registration failed", createEx.getMessage()));
                }
            }

            // Create UserDetails for JWT token generation
            UserDetails userDetails = User.builder()
                .username(existingLogin.getUsername())
                .password("") // No password for Google users
                .roles(existingLogin.getRole())
                .build();
            
            // Generate JWT token
            String jwtToken = jwtService.generateToken(userDetails);
            
            // Create response with token
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);            response.put("username", existingLogin.getUsername());
            response.put("role", existingLogin.getRole());
            response.put("firstName", existingLogin.getFirstName());
            response.put("lastName", existingLogin.getLastName());
            response.put("email", existingLogin.getUsername()); // username contains email for Google users
            
            return ResponseEntity.ok(response);
            
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Authentication failed", "Invalid Google token"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server error", "Google authentication failed: " + e.getMessage()));
        }
    }
}

class LoginResponse {
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public LoginResponse(String username, String role, String firstName, String lastName, String phoneNumber) {
        this.username = username;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }

    // Getters
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }    public String getPhoneNumber() { return phoneNumber; }
}

class PasswordValidationRequest {
    private String rawPassword;
    private String encodedPassword;

    // Default constructor for JSON deserialization
    public PasswordValidationRequest() {}

    public PasswordValidationRequest(String rawPassword, String encodedPassword) {
        this.rawPassword = rawPassword;
        this.encodedPassword = encodedPassword;
    }

    // Getters
    public String getRawPassword() { return rawPassword; }
    public String getEncodedPassword() { return encodedPassword; }

    // Setters
    public void setRawPassword(String rawPassword) { this.rawPassword = rawPassword; }
    public void setEncodedPassword(String encodedPassword) { this.encodedPassword = encodedPassword; }
}

class PasswordValidationResponse {
    private boolean valid;

    public PasswordValidationResponse(boolean valid) {
        this.valid = valid;
    }

    public boolean isValid() { return valid; }
}