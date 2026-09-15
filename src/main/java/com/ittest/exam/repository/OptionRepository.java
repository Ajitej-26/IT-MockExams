package com.ittest.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ittest.exam.entity.Option;

public interface OptionRepository
        extends JpaRepository<Option, Long> {

    List<Option> findByQuestionIdOrderByOptionLabelAsc(
            Long questionId);
}