package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class JobExp {
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Id
    private int id;
    private Date startDate;
    private Date endDate;
    private String companyName;
    private String jobTitle;
    @JoinColumn
    @ManyToOne
    @JsonIgnore
    private User user;
}
