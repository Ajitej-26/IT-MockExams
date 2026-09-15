package com.ittest.exam.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ittest.exam.dto.OptionResponse;
import com.ittest.exam.dto.QuestionRequest;
import com.ittest.exam.dto.QuestionResponse;
import com.ittest.exam.entity.Exam;
import com.ittest.exam.entity.Option;
import com.ittest.exam.entity.Question;
import com.ittest.exam.repository.ExamRepository;
import com.ittest.exam.repository.OptionRepository;
import com.ittest.exam.repository.QuestionRepository;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final OptionRepository optionRepository;

    private final ExamRepository examRepository;

    public QuestionService(
            QuestionRepository questionRepository,
            OptionRepository optionRepository,
            ExamRepository examRepository) {

        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.examRepository = examRepository;
    }

    // Get questions by exam
    public List<QuestionResponse> getQuestionsByExamId(
            Long examId) {

        List<Question> questions =
                questionRepository.findByExamId(examId);

        List<QuestionResponse> responses =
                new ArrayList<>();

        for (Question question : questions) {

        	List<Option> options =
        	        optionRepository
        	                .findByQuestionIdOrderByOptionLabelAsc(
        	                        question.getId());

            List<OptionResponse> optionResponses =
                    new ArrayList<>();

            for (Option option : options) {

                OptionResponse optionResponse =
                        new OptionResponse(
                                option.getId(),
                                option.getOptionLabel(),
                                option.getOptionText()
                        );

                optionResponses.add(optionResponse);
            }

            QuestionResponse questionResponse =
                    new QuestionResponse(
                            question.getId(),
                            question.getQuestionText(),
                            question.getCorrectAnswer(),
                            optionResponses
                    );

            responses.add(questionResponse);
        }

        return responses;
    }

    // Add question
    public Question addQuestion(QuestionRequest request) {

        Exam exam =
                examRepository.findById(request.getExamId())
                        .orElse(null);

        if (exam == null) {
            return null;
        }

        Question question =
                new Question(
                        exam,
                        request.getQuestionText(),
                        request.getCorrectAnswer()
                );

        return questionRepository.save(question);
    }
}