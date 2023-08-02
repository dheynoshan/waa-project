package com.example.backend.service;

import com.example.backend.dto.JobExpDto;

import java.util.List;

public interface JobExpService {
    List<JobExpDto> getAll(int userId);
    JobExpDto create(JobExpDto jobExpDto);
    JobExpDto read(int id);
    JobExpDto update(int id, JobExpDto jobExpDto);
    void delete(int id);
}
