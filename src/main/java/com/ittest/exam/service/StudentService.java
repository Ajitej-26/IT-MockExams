package com.ittest.exam.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ittest.exam.dto.StudentAdminResponse;
import com.ittest.exam.entity.User;
import com.ittest.exam.repository.UserRepository;

@Service
public class StudentService {

    private final UserRepository userRepository;

    public StudentService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getStudentByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    // Admin - Get All Students
    public List<StudentAdminResponse> getAllStudents() {

        List<User> students =
                userRepository.findAll();

        List<StudentAdminResponse> responses =
                new ArrayList<>();

        for (User student : students) {

            StudentAdminResponse response =
                    new StudentAdminResponse(
                            student.getId(),
                            student.getFullName(),
                            student.getRollNumber(),
                            student.getEmail()
                    );

            responses.add(response);
        }

        return responses;
    }
}