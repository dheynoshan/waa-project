package com.example.backend.service;

import com.example.backend.entity.JobPosting;

import java.util.List;

public interface JobPostingService {
    public List<JobPosting> getAllJobs();

    public JobPosting getJobsById(int id);

    public JobPosting createJobs(JobPosting jobPosting);

    public JobPosting updateJobs(int id, JobPosting updatedJobs);

    public void deleteJobPosting(int id);

    public List<JobPosting> getJobFilter(String orgName, String city, String state);
}
