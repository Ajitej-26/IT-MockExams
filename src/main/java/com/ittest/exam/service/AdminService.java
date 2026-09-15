package com.ittest.exam.service;

import org.springframework.stereotype.Service;
import com.ittest.exam.entity.Admin;
import com.ittest.exam.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin login(String email, String password) {
        Admin admin =
                adminRepository.findByEmail(email);

        if (admin == null) {
            return null;
        }
        if (!admin.getPassword().equals(password)) {
            return null;
        }
        return admin;
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}