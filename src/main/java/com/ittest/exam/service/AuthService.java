package com.ittest.exam.service;

import org.springframework.stereotype.Service;

import com.ittest.exam.dto.LoginRequest;
import com.ittest.exam.dto.RegisterRequest;
import com.ittest.exam.entity.User;
import com.ittest.exam.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

// Student Registration
    public String registerStudent(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }
        if (userRepository.existsByRollNumber(request.getRollNumber())) {
            return "Roll number already registered";
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setRollNumber(request.getRollNumber());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        userRepository.save(user);
        return "Student registration successful";
    }

// Student Login
    public String loginStudent(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            return "Invalid email or password";
        }
        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid email or password";
        }
        return "Student login successful";
    }
}