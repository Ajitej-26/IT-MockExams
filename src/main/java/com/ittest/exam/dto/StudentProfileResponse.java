package com.ittest.exam.dto;

public class StudentProfileResponse {

    private String fullName;
    private String rollNumber;
    private String email;

    public StudentProfileResponse() {
    }

    public StudentProfileResponse(
            String fullName,
            String rollNumber,
            String email) {

        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}