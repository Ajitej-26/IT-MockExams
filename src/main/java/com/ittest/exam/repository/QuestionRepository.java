package com.ittest.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ittest.exam.entity.Question;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    List<Question> findByExamId(Long examId);
}