package com.vedicastrology.service;

import com.vedicastrology.entity.Login;
import com.vedicastrology.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login createLogin(Login login) {
        if (loginRepository.existsByUsername(login.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        return loginRepository.save(login);
    }

    public Login updateLogin(Long id, Login login) {
        Login existingLogin = loginRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Login not found"));
        
        if (!existingLogin.getUsername().equals(login.getUsername()) && 
            loginRepository.existsByUsername(login.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        existingLogin.setUsername(login.getUsername());
        existingLogin.setPassword(login.getPassword());
        existingLogin.setRole(login.getRole());
        existingLogin.setFirstName(login.getFirstName());
        existingLogin.setLastName(login.getLastName());
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
        if (login == null || !login.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }
        return login;
    }
}