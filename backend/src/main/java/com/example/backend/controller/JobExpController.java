package com.example.backend.controller;

import com.example.backend.dto.JobExpDto;
import com.example.backend.service.JobExpService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users/{userId}/jobexps")
public class JobExpController {
    private final JobExpService jobExpService;
    @GetMapping
    public List<JobExpDto> getAll(@PathVariable int userId){
        return jobExpService.getAll(userId);
    }

    @PostMapping
    public JobExpDto create(@RequestBody JobExpDto jobExpDto){
        return jobExpService.create(jobExpDto);
    }

    @GetMapping("/{id}")
    public JobExpDto read(@PathVariable int id){
        return jobExpService.read(id);
    }

    @PutMapping("/{id}")
    public JobExpDto update(@PathVariable int id, @RequestBody JobExpDto jobExpDto){
        return jobExpService.update(id, jobExpDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        jobExpService.delete(id);
    }
}
