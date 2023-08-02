package com.example.backend.repository;

import com.example.backend.entity.Education;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface EducationRepo extends ListCrudRepository<Education, Integer> {
    List<Education> findAllByUserId(int userId);
}
