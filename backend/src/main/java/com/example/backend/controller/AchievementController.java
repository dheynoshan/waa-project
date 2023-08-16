package com.example.backend.controller;

import com.example.backend.dto.AchievementDto;
import com.example.backend.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users/{userId}/achievements")
@CrossOrigin
public class AchievementController {
    private final AchievementService achievementService;
    @GetMapping
    public List<AchievementDto> getAll(@PathVariable int userId){
        return achievementService.getAll(userId);
    }

    @PostMapping
    public AchievementDto create(@RequestBody AchievementDto achievementDto){
        return achievementService.create(achievementDto);
    }

    @GetMapping("/{id}")
    public AchievementDto read(@PathVariable int id){
        return achievementService.read(id);
    }

    @PutMapping("/{id}")
    public AchievementDto update(@PathVariable int id, @RequestBody AchievementDto achievementDto){
        return achievementService.update(id, achievementDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        achievementService.delete(id);
    }
}
