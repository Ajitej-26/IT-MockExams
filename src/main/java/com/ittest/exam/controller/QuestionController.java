package com.ittest.exam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ittest.exam.dto.QuestionRequest;
import com.ittest.exam.dto.QuestionResponse;
import com.ittest.exam.entity.Question;
import com.ittest.exam.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService) {

        this.questionService = questionService;
    }


    // Get questions for an exam

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByExam(
            @PathVariable Long examId) {

        List<QuestionResponse> responses =
                questionService
                        .getQuestionsByExamId(examId);

        return ResponseEntity.ok(responses);
    }


    // Add question
    @PostMapping
    public ResponseEntity<?> addQuestion(
            @RequestBody QuestionRequest request) {

        Question savedQuestion =
                questionService.addQuestion(request);

        if (savedQuestion == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Exam not found");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedQuestion);
    }
}