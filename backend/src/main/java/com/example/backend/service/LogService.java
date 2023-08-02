package com.example.backend.service;

import com.example.backend.dto.LogDto;

import java.util.Date;
import java.util.List;

public interface LogService {
    List<LogDto> getAll();
    void insert(Date date, String username, String className, String methodName);
}
