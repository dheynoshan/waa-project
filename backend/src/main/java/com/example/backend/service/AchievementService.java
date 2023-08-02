package com.example.backend.service;

import com.example.backend.dto.AchievementDto;

import java.util.List;

public interface AchievementService {
    List<AchievementDto> getAll(int userId);
    AchievementDto create(AchievementDto achievementDto);
    AchievementDto read(int id);
    AchievementDto update(int id, AchievementDto achievementDto);
    void delete(int id);
}
