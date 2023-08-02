package com.example.backend.dto;

import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AchievementDto {
    private int id;
    private int year;
    private String description;
    @JsonIgnore
    private User user;
}
