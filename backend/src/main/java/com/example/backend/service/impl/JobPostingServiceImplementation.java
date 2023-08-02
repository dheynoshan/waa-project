package com.example.backend.service.impl;

import com.example.backend.entity.Event;
import com.example.backend.entity.JobPosting;
import com.example.backend.entity.News;
import com.example.backend.repository.JobPostingRepository;
import com.example.backend.service.JobPostingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class JobPostingServiceImplementation implements JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Override
    public List<JobPosting> getAllJobs() {
//        return jobPostingRepository.findAll();
        List<JobPosting> notDeletedNews = new ArrayList<>();
        List<JobPosting> jps = jobPostingRepository.findAll();
        for (JobPosting jp : jps) {
            if (!jp.getDeleted()) {
                notDeletedNews.add(jp);
            }
        }
        return notDeletedNews;
    }

    @Override
    public JobPosting getJobsById(int id) {
//        return jobPostingRepository.findById(id).orElse(null);
        JobPosting jp = jobPostingRepository.findById(id).orElse(null);
        if(!jp.getDeleted()){
            return jp;
        }
        return null;
    }

    @Override
    public JobPosting createJobs(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    @Override
    public JobPosting updateJobs(int id, JobPosting updatedJobs) {
        JobPosting jp = jobPostingRepository.findById(id).get();
        if(!jp.getDeleted()) {

            if (Objects.nonNull(updatedJobs.getTitle()) && !"".equalsIgnoreCase(updatedJobs.getTitle())) {
                jp.setTitle(updatedJobs.getTitle());
            }

            if (Objects.nonNull(updatedJobs.getOrgName()) && !"".equalsIgnoreCase(updatedJobs.getOrgName())) {
                jp.setOrgName(updatedJobs.getOrgName());
            }

            if (Objects.nonNull(updatedJobs.getDetails()) && !"".equalsIgnoreCase(updatedJobs.getDetails())) {
                jp.setDetails(updatedJobs.getDetails());
            }

            if (Objects.nonNull(updatedJobs.getDatePosted()) && !updatedJobs.getDatePosted().equals(null)) {
                jp.setDatePosted(updatedJobs.getDatePosted());
            }

            if (Objects.nonNull(updatedJobs.getStatus()) && !updatedJobs.getStatus().equals(null)) {
                jp.setStatus(updatedJobs.getStatus());
            }

            if (Objects.nonNull(updatedJobs.getCity()) && !"".equalsIgnoreCase(updatedJobs.getCity())) {
                jp.setCity(updatedJobs.getCity());
            }

            if (Objects.nonNull(updatedJobs.getState()) && !"".equalsIgnoreCase(updatedJobs.getState())) {
                jp.setState(updatedJobs.getState());
            }

            return jobPostingRepository.save(jp);
        }
        return null;
    }

    @Override
    public void deleteJobPosting(int id) {
        JobPosting jobPosting = jobPostingRepository.findById(id).orElse(null);
        if(jobPosting != null && jobPosting.getDeleted() != true) {
            jobPosting.setDeleted(true);
            jobPostingRepository.save(jobPosting);
        }
    }



    @Override
    public List<JobPosting> getJobFilter(String orgName, String city, String state) {
//        System.out.println(city);
//        return jobPostingRepository.findByOrgNameOrCityOrState(orgName,city,state);
        List<JobPosting> notDeletedNews = new ArrayList<>();
        List<JobPosting> jps = jobPostingRepository.findByOrgNameOrCityOrState(orgName,city,state);
        for (JobPosting jp : jps) {
            if (!jp.getDeleted()) {
                notDeletedNews.add(jp);
            }
        }
        return notDeletedNews;
    }
}
