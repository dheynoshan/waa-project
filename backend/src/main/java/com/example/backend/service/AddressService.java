package com.example.backend.service;


import com.example.backend.dto.AddressDto;


import java.util.List;


public interface AddressService {
    List<AddressDto> getAll();


    AddressDto getAddressById(Integer id);


    String save(AddressDto addressDto);


    String delete(Integer id);


    AddressDto update(Integer id, AddressDto addressDto);


    AddressDto getByUserId(Integer userId);
}



