package com.ittest.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ittest.exam.entity.Exam;

public interface ExamRepository
        extends JpaRepository<Exam, Long> {

    List<Exam> findByActiveTrue();
}