package com.example.backend.dto;

import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LogDto {
    private int id;
    private Date time;
    private String description;
}
