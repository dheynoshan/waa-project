package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
    private Integer id;
    private String number;
    private String street;
    private String city;
    private String state;
    private Integer zip;
    private Boolean isDeleted;
    private User user;
}
