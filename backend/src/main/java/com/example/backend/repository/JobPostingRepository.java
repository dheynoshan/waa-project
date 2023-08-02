package com.example.backend.repository;

import com.example.backend.entity.JobPosting;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface JobPostingRepository extends ListCrudRepository<JobPosting, Integer> {
    List<JobPosting> findByOrgNameOrCityOrState(String orgName, String city, String state);
}
