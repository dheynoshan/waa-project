package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Achievement {
    @GeneratedValue(strategy= GenerationType.AUTO);
    @Id
    private int id;
    private int year;
}
