package com.example.backend.service.impl;

import com.example.backend.dto.LogDto;
import com.example.backend.entity.Log;
import com.example.backend.repository.LogRepo;
import com.example.backend.service.LogService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LogServiceImpl implements LogService {
    private final LogRepo logRepo;
    private final ModelMapper modelMapper;
    @Override
    public List<LogDto> getAll() {
        List<Log> logs = logRepo.findAll();
        List<LogDto> results = new ArrayList<>();

        logs.forEach(log -> {
            LogDto dto = modelMapper.map(log,LogDto.class);
            results.add(dto);
        });
        return results;
    }

    @Override
    public void insert(Date date, String username, String className, String methodName){
        Log log = new Log();
        log.setTime(date);
        log.setDescription(username + " called " + className + "." + methodName);
        logRepo.save(log);
    }
}
