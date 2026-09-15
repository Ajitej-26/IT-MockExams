package com.ittest.exam.dto;

import java.time.LocalDateTime;

public class ResultResponse {

private Long resultId;

private String email;

private Long examId;

private String examTitle;

private int totalQuestions;

private int correctAnswers;

private int score;

private LocalDateTime attemptedAt;


public ResultResponse() {
}


public ResultResponse(
        Long resultId,
        String email,
        Long examId,
        String examTitle,
        int totalQuestions,
        int correctAnswers,
        int score,
        LocalDateTime attemptedAt) {

    this.resultId = resultId;
    this.email = email;
    this.examId = examId;
    this.examTitle = examTitle;
    this.totalQuestions = totalQuestions;
    this.correctAnswers = correctAnswers;
    this.score = score;
    this.attemptedAt = attemptedAt;
}


public Long getResultId() {
    return resultId;
}

public void setResultId(Long resultId) {
    this.resultId = resultId;
}


public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}


public Long getExamId() {
    return examId;
}

public void setExamId(Long examId) {
    this.examId = examId;
}


public String getExamTitle() {
    return examTitle;
}

public void setExamTitle(String examTitle) {
    this.examTitle = examTitle;
}


public int getTotalQuestions() {
    return totalQuestions;
}

public void setTotalQuestions(int totalQuestions) {
    this.totalQuestions = totalQuestions;
}


public int getCorrectAnswers() {
    return correctAnswers;
}

public void setCorrectAnswers(int correctAnswers) {
    this.correctAnswers = correctAnswers;
}


public int getScore() {
    return score;
}

public void setScore(int score) {
    this.score = score;
}


public LocalDateTime getAttemptedAt() {
    return attemptedAt;
}

public void setAttemptedAt(LocalDateTime attemptedAt) {
    this.attemptedAt = attemptedAt;
}
}
