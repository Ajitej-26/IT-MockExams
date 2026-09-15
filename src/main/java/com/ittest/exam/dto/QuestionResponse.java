package com.ittest.exam.dto;

import java.util.List;

public class QuestionResponse {

    private Long id;

    private String questionText;

    private String correctAnswer;

    private List<OptionResponse> options;


    public QuestionResponse() {

    }


    public QuestionResponse(
            Long id,
            String questionText,
            String correctAnswer,
            List<OptionResponse> options) {

        this.id = id;

        this.questionText = questionText;

        this.correctAnswer = correctAnswer;

        this.options = options;
    }


    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }


    public String getQuestionText() {

        return questionText;
    }

    public void setQuestionText(String questionText) {

        this.questionText = questionText;
    }


    public String getCorrectAnswer() {

        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {

        this.correctAnswer = correctAnswer;
    }


    public List<OptionResponse> getOptions() {

        return options;
    }

    public void setOptions(List<OptionResponse> options) {

        this.options = options;
    }
}