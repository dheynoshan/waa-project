package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Achievement {
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Id
    private int id;
    private int year;
    private String description;
    @JoinColumn
    @ManyToOne
    @JsonIgnore
    private User user;
}
