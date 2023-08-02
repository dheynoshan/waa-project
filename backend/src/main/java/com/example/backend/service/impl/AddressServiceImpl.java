package com.example.backend.service.impl;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.repository.AddressRepo;
import com.example.backend.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepo addressRepo;
    private final ModelMapper modelMapper;

    public List<AddressDto> getAll() {
        List<Address> addressList = addressRepo.findAll();
        List<AddressDto> addressDtoList = new ArrayList<>();
        addressList.forEach(address -> {
            if (!address.getIsDeleted()) {
                AddressDto addressDto = modelMapper.map(address, AddressDto.class);
                addressDtoList.add(addressDto);
            }
        });
        return addressDtoList;
    }

    public AddressDto getAddressById(Integer id) {
        Address address = addressRepo.findById(id).get();
        return modelMapper.map(address, AddressDto.class);
    }

    public String save(AddressDto addressDto) {
        Address address = modelMapper.map(addressDto, Address.class);
        addressRepo.save(address);
        return "Address saved successfully";
    }

    public String delete(Integer id) {
        Address address = addressRepo.findById(id).get();
        if (!address.getIsDeleted())
            address.setIsDeleted(true);
        else
            addressRepo.deleteById(id);

        return "Address deletion successful";
    }

    @Override
    public AddressDto update(Integer id, AddressDto addressDto) {
        Address address = addressRepo.findById(id).get();
        if (addressDto.getNumber() != null)
            address.setNumber(addressDto.getNumber());
        if (addressDto.getStreet() != null)
            address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null)
            address.setCity(addressDto.getCity());
        if (addressDto.getState() != null)
            address.setState(addressDto.getState());
        if (addressDto.getZip() != null)
            address.setZip(addressDto.getZip());
        addressRepo.save(address);
        return modelMapper.map(address, AddressDto.class);
    }


}
