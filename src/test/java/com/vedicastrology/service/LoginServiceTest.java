package com.vedicastrology.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class LoginServiceTest {

    @Autowired
    private LoginService loginService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testPasswordValidation() {
        String rawPassword = "password123";
        // Generate correct hash for the test password
        String encodedPassword = "$2a$10$Zk84dC1BleAWF3q73QyBiOhKtrTtYKAXQFHS9AFYO6wovYnMGpYy6";//passwordEncoder.encode(rawPassword);
        
        boolean isValid = loginService.validatePassword(rawPassword, encodedPassword);
        System.out.println("Raw password: " + rawPassword);
        System.out.println("Encoded password: " + encodedPassword);
        System.out.println("Is valid: " + isValid);
        
        // Create a new encoded password and verify it works
        String newEncodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Newly encoded password: " + newEncodedPassword);
        boolean isValidWithNewEncoding = passwordEncoder.matches(rawPassword, newEncodedPassword);
        System.out.println("Is valid with new encoding: " + isValidWithNewEncoding);
        
        assertTrue(isValid, "Password validation should succeed");
        assertTrue(isValidWithNewEncoding, "Password validation with new encoding should succeed");
    }
}