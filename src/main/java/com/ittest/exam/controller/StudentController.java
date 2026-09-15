package com.ittest.exam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ittest.exam.dto.StudentAdminResponse;
import com.ittest.exam.dto.StudentProfileResponse;
import com.ittest.exam.entity.User;
import com.ittest.exam.service.StudentService;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getStudentProfile(
            @RequestParam String email) {

        User student =
                studentService.getStudentByEmail(email);

        if (student == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Student not found");
        }

        StudentProfileResponse response =
                new StudentProfileResponse(
                        student.getFullName(),
                        student.getRollNumber(),
                        student.getEmail()
                );

        return ResponseEntity.ok(response);
    }

    // Admin - View All Students
    @GetMapping("/admin")
    public ResponseEntity<List<StudentAdminResponse>> getAllStudents() {

        List<StudentAdminResponse> students =
                studentService.getAllStudents();

        return ResponseEntity.ok(students);
    }
}