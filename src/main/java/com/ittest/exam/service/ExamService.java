package com.ittest.exam.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.ittest.exam.entity.Exam;
import com.ittest.exam.repository.ExamRepository;

@Service
public class ExamService {
    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

// Student - available exams
    public List<Exam> getAvailableExams() {
        return examRepository.findByActiveTrue();
    }

// Admin - all exams
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

// Admin - add exam
    public Exam addExam(Exam exam) {
        return examRepository.save(exam);
    }

// Admin - find exam
    public Exam getExamById(Long id) {
        return examRepository
                .findById(id)
                .orElse(null);
    }

// Admin - update exam
    public Exam updateExam(
            Long id,
            Exam examDetails) {
        Exam exam =
                examRepository
                    .findById(id)
                    .orElse(null);
        if (exam == null) {
            return null;
        }
        exam.setTitle(
                examDetails.getTitle()
        );

        exam.setDescription(
                examDetails.getDescription()
        );

        exam.setTotalQuestions(
                examDetails.getTotalQuestions()
        );

        exam.setDurationMinutes(
                examDetails.getDurationMinutes()
        );
        exam.setActive(
                examDetails.isActive()
        );
        return examRepository.save(exam);
    }

// Admin - delete exam
    public boolean deleteExam(Long id) {
        if (!examRepository.existsById(id)) {
            return false;
        }
        examRepository.deleteById(id);
        return true;
    }
    
}