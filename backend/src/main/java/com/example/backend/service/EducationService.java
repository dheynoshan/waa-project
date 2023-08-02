package com.example.backend.service;

import com.example.backend.dto.EducationDto;

import java.util.List;

public interface EducationService {
    List<EducationDto> getAll(int userId);
    EducationDto create(EducationDto educationDto);
    EducationDto read(int id);
    EducationDto update(int id, EducationDto educationDto);
    void delete(int id);
}
