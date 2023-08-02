package com.example.backend.controller;

import com.example.backend.entity.JobPosting;
import com.example.backend.service.impl.JobPostingServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/jobs")
public class JobPostingController {
    @Autowired
    private JobPostingServiceImplementation jobPostingService;

    @GetMapping
    public List<JobPosting> getAllJobs(@RequestParam("orgName") Optional<String> orgName, @RequestParam("city") Optional<String> city, @RequestParam("state") Optional<String> state) {
        return !orgName.isPresent() && !city.isPresent() && !state.isPresent() ?
                jobPostingService.getAllJobs() :
                jobPostingService.getJobFilter(
                        orgName.orElse(""),
                        city.orElse(""),
                        state.orElse("")
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPosting> getJobById(@PathVariable int id) {
        JobPosting job = jobPostingService.getJobsById(id);
        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<JobPosting> createJob(@RequestBody JobPosting job) {
        JobPosting createdJob = jobPostingService.createJobs(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPosting> updateCategory(@PathVariable int id, @RequestBody JobPosting job) {
        JobPosting updatedJob = jobPostingService.updateJobs(id, job);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable int id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.noContent().build();
    }
}
