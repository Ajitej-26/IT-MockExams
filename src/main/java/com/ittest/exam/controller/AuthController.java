package com.ittest.exam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ittest.exam.dto.LoginRequest;
import com.ittest.exam.dto.RegisterRequest;
import com.ittest.exam.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

// Student Registration
    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(
            @RequestBody RegisterRequest request) {
        String message =
                authService.registerStudent(request);
        if (message.equals("Email already registered")
                || message.equals("Roll number already registered")) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(message);
        }
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(message);
    }

// Student Login
    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(
            @RequestBody LoginRequest request) {
        String message =
                authService.loginStudent(request);
        if (message.equals("Invalid email or password")) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(message);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(message);
    }
}