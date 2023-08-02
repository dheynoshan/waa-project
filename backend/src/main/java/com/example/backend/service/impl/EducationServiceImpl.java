package com.example.backend.service.impl;

import com.example.backend.dto.EducationDto;
import com.example.backend.entity.Education;
import com.example.backend.repository.EducationRepo;
import com.example.backend.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EducationServiceImpl implements EducationService {
    private final EducationRepo educationRepo;
    private final ModelMapper modelMapper;
    @Override
    public List<EducationDto> getAll(int userId) {
        List<Education> educations = educationRepo.findAllByUserId(userId);
        List<EducationDto> results = new ArrayList<>();
        educations.forEach(education -> {
            EducationDto dto = modelMapper.map(education, EducationDto.class);
            results.add(dto);
        });
        return results;
    }

    @Override
    public EducationDto create(EducationDto educationDto) {
        Education education = modelMapper.map(educationDto, Education.class);
        educationRepo.save(education);
        return educationDto;
    }

    @Override
    public EducationDto read(int id) {
        Education education = educationRepo.findById(id).orElse(null);
        return modelMapper.map(education, EducationDto.class);
    }

    @Override
    public EducationDto update(int id, EducationDto educationDto) {
        educationDto.setId(id);
        Education education = modelMapper.map(educationDto, Education.class);
        educationRepo.save(education);
        return educationDto;
    }

    @Override
    public void delete(int id) {
        educationRepo.deleteById(id);
    }
}
