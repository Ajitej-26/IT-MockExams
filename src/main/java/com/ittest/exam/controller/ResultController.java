package com.ittest.exam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ittest.exam.dto.ResultRequest;
import com.ittest.exam.dto.ResultResponse;
import com.ittest.exam.entity.Result;
import com.ittest.exam.service.ResultService;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(
            ResultService resultService) {
        this.resultService =
                resultService;
    }

// Submit Exam
    @PostMapping("/submit")
    public ResponseEntity<ResultResponse> submitExam(
            @RequestBody ResultRequest request) {

        Result result =
                resultService.calculateResult(request);

        ResultResponse response =
                new ResultResponse(
                        result.getId(),
                        result.getEmail(),
                        result.getExam().getId(),
                        result.getExam().getTitle(),
                        result.getTotalQuestions(),
                        result.getCorrectAnswers(),
                        result.getScore(), null
                );
        return ResponseEntity.ok(response);
    }

// Student Exam History
    @GetMapping("/student")
    public ResponseEntity<List<Result>> getStudentResults(
            @RequestParam String email) {

        List<Result> results =
                resultService.getStudentResults(email);
        return ResponseEntity.ok(results);
    }
    @GetMapping("/admin")
    public ResponseEntity<List<Result>> getAllResults() {

        List<Result> results =
                resultService.getAllResults();

        return ResponseEntity.ok(results);
    }
}