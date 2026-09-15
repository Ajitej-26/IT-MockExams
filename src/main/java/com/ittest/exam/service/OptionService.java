package com.ittest.exam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ittest.exam.entity.Option;
import com.ittest.exam.repository.OptionRepository;

@Service
public class OptionService {

    private final OptionRepository optionRepository;

    public OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }


    // Get options for a question

    public List<Option> getOptionsByQuestionId(
            Long questionId) {

    	return optionRepository
    	        .findByQuestionIdOrderByOptionLabelAsc(questionId);
    }


    // Add option

    public Option addOption(Option option) {

        return optionRepository.save(option);
    }
}