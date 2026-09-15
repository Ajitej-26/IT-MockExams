package com.ittest.exam.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.ittest.exam.dto.ResultRequest;
import com.ittest.exam.entity.Exam;
import com.ittest.exam.entity.Question;
import com.ittest.exam.entity.Result;
import com.ittest.exam.repository.ExamRepository;
import com.ittest.exam.repository.QuestionRepository;
import com.ittest.exam.repository.ResultRepository;

@Service
public class ResultService {

    private final ResultRepository resultRepository;
    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;

    public ResultService(
            ResultRepository resultRepository,
            ExamRepository examRepository,
            QuestionRepository questionRepository) {

        this.resultRepository = resultRepository;
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
    }

    public Result calculateResult(ResultRequest request) {

        Exam exam = examRepository
                .findById(request.getExamId())
                .orElseThrow(() ->
                        new RuntimeException("Exam not found"));

        List<Question> questions =
                questionRepository
                        .findByExamId(request.getExamId());

        Map<Long, String> answers =
                request.getAnswers();

        int correctAnswers = 0;

        for (Question question : questions) {

            String studentAnswer =
                    answers.get(question.getId());

            if (studentAnswer != null &&
                    studentAnswer.equals(
                            question.getCorrectAnswer())) {

                correctAnswers++;
            }
        }

        int totalQuestions =
                questions.size();

        int score =
                correctAnswers;

        Result result = new Result(
                request.getEmail(),
                exam,
                totalQuestions,
                correctAnswers,
                score
        );
        return resultRepository.save(result);
    }
    public List<Result> getStudentResults(String email) {
        return resultRepository.findByEmail(email);
    }
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
}