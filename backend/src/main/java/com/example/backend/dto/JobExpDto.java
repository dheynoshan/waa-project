package com.example.backend.dto;

import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class JobExpDto {
    private int id;
    private Date startDate;
    private Date endDate;
    private String companyName;
    private String jobTitle;
    @JsonIgnore
    private User user;
}
