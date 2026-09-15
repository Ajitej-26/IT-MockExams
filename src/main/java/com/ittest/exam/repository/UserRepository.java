package com.ittest.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ittest.exam.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    boolean existsByRollNumber(String rollNumber);

    User findByEmail(String email);

    List<User> findAll();
}