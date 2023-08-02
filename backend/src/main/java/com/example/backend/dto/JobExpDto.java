package com.example.backend.dto;

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

}
