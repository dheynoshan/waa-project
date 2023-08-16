package com.example.backend.controller;

import com.example.backend.dto.LogDto;
import com.example.backend.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/logs")
@CrossOrigin
public class LogController {
    private final LogService logService;

    @GetMapping
    public List<LogDto> getAll(){
        return logService.getAll();
    }
}
