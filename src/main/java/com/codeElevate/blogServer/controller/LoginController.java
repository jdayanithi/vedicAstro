package com.codeElevate.blogServer.controller;

import com.codeElevate.blogServer.entity.Login;
import com.codeElevate.blogServer.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

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
    }
}