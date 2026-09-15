package com.ittest.exam.dto;

public class StudentAdminResponse {

    private Long id;
    private String fullName;
    private String rollNumber;
    private String email;

    public StudentAdminResponse() {
    }

    public StudentAdminResponse(
            Long id,
            String fullName,
            String rollNumber,
            String email) {

        this.id = id;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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