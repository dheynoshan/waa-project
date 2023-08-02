package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    private String schoolName;
    private String degree;
    @JoinColumn
    @ManyToOne
    @JsonIgnore
    private User user;
}
