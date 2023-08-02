package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue
    private Integer id;

    private String number;
    private String street;
    private String city;
    private String state;
    private Integer zip;
    private Boolean isDeleted;

    @OneToOne
    @JoinColumn
    @JsonIgnore
    private User user;
}
