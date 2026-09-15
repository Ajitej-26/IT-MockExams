package com.ittest.exam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ittest.exam.entity.Admin;
import com.ittest.exam.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String email,
            @RequestParam String password) {

        Admin admin =adminService.login(email, password);

        if (admin == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid admin email or password");
        }
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @RequestParam String email) {

        Admin admin =adminService.getAdminByEmail(email);

        if (admin == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Admin not found");
        }
        return ResponseEntity.ok(admin);
    }
}