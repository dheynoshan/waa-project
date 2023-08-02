package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Log {
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Id
    private int id;
    private Date time;
    private String description;
}
