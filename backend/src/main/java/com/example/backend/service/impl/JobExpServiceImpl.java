package com.example.backend.service.impl;

import com.example.backend.dto.JobExpDto;
import com.example.backend.entity.JobExp;
import com.example.backend.repository.JobExpRepo;
import com.example.backend.service.JobExpService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class JobExpServiceImpl implements JobExpService {
    private final JobExpRepo jobExpRepo;
    private final ModelMapper modelMapper;
    @Override
    public List<JobExpDto> getAll(int userId) {
        List<JobExp> jobs = jobExpRepo.findAllByUserId(userId);
        List<JobExpDto> results = new ArrayList<>();
        jobs.forEach(job -> {
            JobExpDto dto = modelMapper.map(job, JobExpDto.class);
            results.add(dto);
        });
        return results;
    }

    @Override
    public JobExpDto create(JobExpDto jobExpDto) {
        JobExp job = modelMapper.map(jobExpDto, JobExp.class);
        jobExpRepo.save(job);
        return jobExpDto;
    }

    @Override
    public JobExpDto read(int id) {
        JobExp jobExp = jobExpRepo.findById(id).orElse(null);
        return modelMapper.map(jobExp, JobExpDto.class);
    }

    @Override
    public JobExpDto update(int id, JobExpDto jobExpDto) {
        jobExpDto.setId(id);
        JobExp jobExp = modelMapper.map(jobExpDto, JobExp.class);
        jobExpRepo.save(jobExp);
        return jobExpDto;
    }

    @Override
    public void delete(int id) {
        jobExpRepo.deleteById(id);
    }
}
