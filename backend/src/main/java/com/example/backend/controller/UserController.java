package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    //User service
    private final UserService userService;

    //Get All the User records
    @GetMapping
    public List<UserDto> getAll(){
        return userService.getAll();
    }

    //Get User by id
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Integer id){
        return userService.getUserById(id);
    }

    //Save User
    @PostMapping
    public ResponseEntity<String> save(@RequestBody UserDto userDto){
        System.out.println(userDto.getIsDeleted());
        String response = userService.save(userDto);
        return ResponseEntity.ok().body(response);
    }

    //delete User by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        String response = userService.delete(id);
        return ResponseEntity.ok().body(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Integer id, @RequestBody UserDto userDto){
        var dto = userService.update(id, userDto);
        return ResponseEntity.ok().body(dto);
    }

    @PutMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody String email, @RequestBody String password){
        String response = userService.resetPassword(email, password);
        return ResponseEntity.ok().body(response);
    }

}
