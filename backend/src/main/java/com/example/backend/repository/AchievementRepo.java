package com.example.backend.repository;

import com.example.backend.entity.Achievement;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface AchievementRepo extends ListCrudRepository<Achievement, Integer> {
    List<Achievement> findAllByUserId(int userId);
}
