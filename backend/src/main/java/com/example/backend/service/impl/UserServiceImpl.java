package com.example.backend.service.impl;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAll() {
        List<User> userList = userRepo.findAll();
        List<UserDto> userDtoList = new ArrayList<>();
        userList.forEach(user -> {
            if (!user.getIsDeleted()) {
                UserDto userDto = modelMapper.map(user, UserDto.class);
                userDtoList.add(userDto);
            }
        });
        return userDtoList;
    }

    public UserDto getUserById(Integer id) {
        User user = userRepo.findById(id).get();
        return modelMapper.map(user, UserDto.class);
    }

    public String save(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        userRepo.save(user);
        return "User saved successfully";
    }

    public String delete(Integer id) {
        User user = userRepo.findById(id).get();
        if (!user.getIsDeleted()) {
            user.setIsDeleted(true);
            userRepo.save(user);
        } else {
            userRepo.deleteById(id);
        }
        return "User deletion successful";
    }

    @Override
    public UserDto update(Integer id, UserDto userDto) {
        System.out.println(userDto.getIsDeleted());
        User user = userRepo.findById(id).get();
        if (userDto.getFirstName() != null)
            user.setFirstName(userDto.getFirstName());
        if (userDto.getLastName() != null)
            user.setLastName(userDto.getLastName());
        if (userDto.getEmail() != null)
            user.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null)
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepo.save(user);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public String resetPassword(String email, String password) {
        User user = userRepo.findByEmail(email).get();
        if (password != null) {
            user.setPassword(passwordEncoder.encode(password));
            userRepo.save(user);
            return "Password changed";
        } else
            return "Unable to change the password";
    }


}
