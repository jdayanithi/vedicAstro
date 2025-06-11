package com.vedicastrology.service;

import com.vedicastrology.entity.Login;
import com.vedicastrology.entity.UserType;
import com.vedicastrology.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Login createLogin(Login login) {
        if (loginRepository.existsByUsername(login.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Set default user type if not provided
        if (login.getUserType() == null) {
            login.setUserType(UserType.student);
        }
        
        // Hash the password before saving
        login.setPassword(passwordEncoder.encode(login.getPassword()));
        return loginRepository.save(login);
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
        if (!loginRepository.existsById(id)) {
            throw new RuntimeException("Login not found");
        }
        loginRepository.deleteById(id);
    }

    public Login validateLogin(String username, String password) {
        Login login = loginRepository.findByUsername(username);
        if (login == null || !passwordEncoder.matches(password, login.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
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
}