package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Education {
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Id
    private int id;
    private Date startDate;
    private Date endDate;
    private String degree;
}
