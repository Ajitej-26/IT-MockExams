package com.ittest.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ittest.exam.entity.Admin;

public interface AdminRepository
        extends JpaRepository<Admin, Long> {

    Admin findByEmail(String email);

    boolean existsByEmail(String email);
}