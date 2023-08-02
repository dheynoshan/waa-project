package com.example.backend.controller;

import com.example.backend.dto.EducationDto;
import com.example.backend.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users/{userId}/educations")
public class EducationController {
    private final EducationService educationService;
    @GetMapping
    public List<EducationDto> getAll(@PathVariable int userId){
        return educationService.getAll(userId);
    }

    @PostMapping
    public EducationDto create(@RequestBody EducationDto educationDto){
        return educationService.create(educationDto);
    }

    @GetMapping("/{id}")
    public EducationDto read(@PathVariable int id){
        return educationService.read(id);
    }

    @PutMapping("/{id}")
    public EducationDto update(@PathVariable int id, @RequestBody EducationDto educationDto){
        return educationService.update(id, educationDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        educationService.delete(id);
    }
}
