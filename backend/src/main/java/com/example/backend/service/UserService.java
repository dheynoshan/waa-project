package com.example.backend.service;

import com.example.backend.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();

    UserDto getUserById(Integer id);

    String save(UserDto userDto);

    String delete(Integer id);

    UserDto update(Integer id, UserDto userDto);

    String resetPassword(String email, String password);
}
