package com.example.backend.repository;

import com.example.backend.entity.JobExp;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface JobExpRepo extends ListCrudRepository<JobExp, Integer> {
    List<JobExp> findAllByUserId(int userId);
}
