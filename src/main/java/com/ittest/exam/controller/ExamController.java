package com.ittest.exam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ittest.exam.entity.Exam;
import com.ittest.exam.service.ExamService;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }


    // =========================================
    // Student - Available Exams
    // =========================================

    @GetMapping
    public ResponseEntity<List<Exam>> getAvailableExams() {

        List<Exam> exams =
                examService.getAvailableExams();

        return ResponseEntity.ok(exams);
    }


    // =========================================
    // Admin - View All Exams
    // =========================================

    @GetMapping("/admin")
    public ResponseEntity<List<Exam>> getAllExams() {

        List<Exam> exams =
                examService.getAllExams();

        return ResponseEntity.ok(exams);
    }


    // =========================================
    // Admin - Add Exam
    // =========================================

    @PostMapping
    public ResponseEntity<Exam> addExam(
            @RequestBody Exam exam) {

        Exam savedExam =
                examService.addExam(exam);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedExam);
    }


    // =========================================
    // Admin - Get Exam By ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getExamById(
            @PathVariable Long id) {

        Exam exam =
                examService.getExamById(id);

        if (exam == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Exam not found");
        }

        return ResponseEntity.ok(exam);
    }


    // =========================================
    // Admin - Update Exam
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExam(
            @PathVariable Long id,
            @RequestBody Exam examDetails) {

        Exam updatedExam =
                examService.updateExam(
                        id,
                        examDetails
                );

        if (updatedExam == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Exam not found");
        }

        return ResponseEntity.ok(updatedExam);
    }


    // =========================================
    // Admin - Delete Exam
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(
            @PathVariable Long id) {

        boolean deleted =
                examService.deleteExam(id);

        if (!deleted) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Exam not found");
        }

        return ResponseEntity.ok(
                "Exam deleted successfully"
        );
    }
}