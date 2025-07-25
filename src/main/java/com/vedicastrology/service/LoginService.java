package com.vedicastrology.service;

import com.vedicastrology.entity.Login;
import com.vedicastrology.entity.UserType;
import com.vedicastrology.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DeletionHistoryService deletionHistoryService;    public Login createLogin(Login login) {
        logger.info("📝 Creating new login for username: {}", login.getUsername());
        
        if (loginRepository.existsByUsername(login.getUsername())) {
            logger.error("❌ Username already exists: {}", login.getUsername());
            throw new RuntimeException("Username already exists");
        }
        
        logger.debug("🔍 Checking user type for new login...");
        // Set default user type if not provided
        if (login.getUserType() == null) {
            login.setUserType(UserType.student);
            logger.debug("✅ Set default user type to: student");
        }
        
        logger.debug("🔐 Encoding password for new user...");
        // Hash the password before saving
        login.setPassword(passwordEncoder.encode(login.getPassword()));
        
        try {
            Login savedLogin = loginRepository.save(login);
            logger.info("✅ Successfully created login with ID: {} for username: {}", 
                       savedLogin.getId(), savedLogin.getUsername());
            return savedLogin;
        } catch (Exception e) {
            logger.error("💥 Failed to save new login: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create login: " + e.getMessage(), e);
        }
    }

    public Login updateLogin(Long id, Login login) {
        Login existingLogin = loginRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Login not found"));

        if (!existingLogin.getUsername().equals(login.getUsername()) &&
            loginRepository.existsByUsername(login.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Update basic information
        existingLogin.setUsername(login.getUsername());
        if (login.getPassword() != null && !login.getPassword().isEmpty()) {
            existingLogin.setPassword(passwordEncoder.encode(login.getPassword()));
        }
        existingLogin.setRole(login.getRole());
        existingLogin.setFirstName(login.getFirstName());
        existingLogin.setLastName(login.getLastName());
        existingLogin.setPhoneNumber(login.getPhoneNumber());
        
        // Update astrological information
        existingLogin.setBirthDate(login.getBirthDate());
        existingLogin.setBirthTime(login.getBirthTime());
        existingLogin.setBirthPlace(login.getBirthPlace());
        existingLogin.setProfilePicture(login.getProfilePicture());
        existingLogin.setBio(login.getBio());
        existingLogin.setUserType(login.getUserType());
        existingLogin.setZodiacSign(login.getZodiacSign());
        existingLogin.setRisingSign(login.getRisingSign());
        existingLogin.setMoonSign(login.getMoonSign());
        
        existingLogin.setUpdatedBy(login.getUpdatedBy());

        return loginRepository.save(existingLogin);
    }

    public Login getLoginById(Long id) {
        return loginRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Login not found"));
    }

    public List<Login> getAllLogins() {
        return loginRepository.findAll();
    }

    public void deleteLogin(Long id) {
        logger.info("🗑️ Attempting to delete login with ID: {}", id);
        
        if (!loginRepository.existsById(id)) {
            logger.error("❌ Login not found with ID: {}", id);
            throw new RuntimeException("Login not found");
        }
        
        // Get the login data before deletion for history
        Login loginToDelete = loginRepository.findById(id).orElse(null);
        if (loginToDelete != null) {
            logger.debug("📝 Recording deletion history for login: {}", loginToDelete.getUsername());
            // Record the deletion in history
            deletionHistoryService.recordDeletion("users", id, loginToDelete, "User account deleted");
        }
        
        try {
            loginRepository.deleteById(id);
            logger.info("✅ Successfully deleted login with ID: {}", id);
        } catch (Exception e) {
            logger.error("💥 Failed to delete login with ID: {}", id, e);
            throw new RuntimeException("Failed to delete login: " + e.getMessage(), e);
        }
    }    public Login validateLogin(String username, String password) {
        logger.info("🔍 Validating login for username: {}", username);
        
        Login login = loginRepository.findByUsername(username);
        if (login == null) {
            logger.warn("❌ User not found: {}", username);
            throw new RuntimeException("Invalid username or password");
        }
        
        logger.debug("✅ User found: {} (ID: {})", login.getUsername(), login.getId());
        
        boolean passwordMatches = passwordEncoder.matches(password, login.getPassword());
        logger.debug("🔐 Password validation result: {}", passwordMatches);
        
        if (!passwordMatches) {
            logger.warn("❌ Password mismatch for user: {}", username);
            throw new RuntimeException("Invalid username or password");
        }
        
        logger.info("✅ Login validation successful for user: {}", username);
        return login;
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public List<Login> searchUsers(String query) {
        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }
        return loginRepository.searchUsers(query.trim());
    }

    public List<Login> searchLogins(String query) {
        return searchUsers(query);
    }    public Login findByUsername(String username) {
        logger.debug("🔍 Searching for user with username: {}", username);
        
        try {
            Login login = loginRepository.findByUsername(username);
            if (login == null) {
                logger.debug("❌ User not found with username: {}", username);
                throw new RuntimeException("User not found");
            }
            logger.debug("✅ Found user: {} with ID: {}", login.getUsername(), login.getId());
            return login;
        } catch (Exception e) {
            logger.error("💥 Error searching for user {}: {}", username, e.getMessage(), e);
            throw e;
        }
    }

    public Login findByEmail(String email) {
        return loginRepository.findByUsername(email); // Assuming email is used as username
    }
}