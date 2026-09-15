package com.ittest.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ittest.exam.entity.Result;

public interface ResultRepository
        extends JpaRepository<Result, Long> {

    List<Result> findByEmail(String email);

}