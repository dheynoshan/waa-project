package com.example.backend.service.impl;

import com.example.backend.dto.AchievementDto;
import com.example.backend.entity.Achievement;
import com.example.backend.repository.AchievementRepo;
import com.example.backend.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AchievementServiceImpl implements AchievementService {
    private final AchievementRepo achievementRepo;
    private final ModelMapper modelMapper;
    @Override
    public List<AchievementDto> getAll(int userId) {
        List<Achievement> achievements = achievementRepo.findAllByUserId(userId);
        List<AchievementDto> results = new ArrayList<>();
        achievements.forEach(achievement -> {
            AchievementDto dto = modelMapper.map(achievement, AchievementDto.class);
            results.add(dto);
        });
        return results;
    }

    @Override
    public AchievementDto create(AchievementDto achievementDto) {
        Achievement achievement = modelMapper.map(achievementDto, Achievement.class);
        achievementRepo.save(achievement);
        return achievementDto;
    }

    @Override
    public AchievementDto read(int id) {
        Achievement achievement = achievementRepo.findById(id).orElse(null);
        return modelMapper.map(achievement, AchievementDto.class);
    }

    @Override
    public AchievementDto update(int id, AchievementDto achievementDto) {
        achievementDto.setId(id);
        Achievement achievement = modelMapper.map(achievementDto, Achievement.class);
        achievementRepo.save(achievement);
        return achievementDto;
    }

    @Override
    public void delete(int id) {
        achievementRepo.deleteById(id);
    }
}
