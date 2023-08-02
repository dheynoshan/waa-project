package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Setter
@Getter
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String orgName;
    private String details;
    private Date datePosted;
    private Boolean status;
    private String city;
    private String state;

    private Boolean deleted = false;
    @JoinColumn
    @ManyToOne
    @JsonIgnore
    private User user;
}
