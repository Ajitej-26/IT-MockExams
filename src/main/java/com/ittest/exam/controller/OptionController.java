package com.ittest.exam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ittest.exam.entity.Option;
import com.ittest.exam.service.OptionService;

@RestController
@RequestMapping("/api/options")
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }


    // Get options for a question

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Option>> getOptionsByQuestion(
            @PathVariable Long questionId) {

        List<Option> options =
                optionService.getOptionsByQuestionId(questionId);

        return ResponseEntity.ok(options);
    }


    // Add an option

    @PostMapping
    public ResponseEntity<Option> addOption(
            @RequestBody Option option) {

        Option savedOption =
                optionService.addOption(option);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedOption);
    }
}