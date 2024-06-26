package com.example.backend.controller;


import com.example.backend.dto.AddressDto;
import com.example.backend.dto.UserDto;
import com.example.backend.service.AddressService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/v1/addresses")
@RequiredArgsConstructor
@CrossOrigin
public class AddressController {
    private final AddressService addressService;


    @GetMapping
    public List<AddressDto> getAll() {
        return addressService.getAll();
    }


    @GetMapping("/{id}")
    public AddressDto getAddressById(@PathVariable Integer id) {
        return addressService.getAddressById(id);
    }


    @PostMapping
    public ResponseEntity<String> save(@RequestBody AddressDto addressDto) {
        String response = addressService.save(addressDto);
        return ResponseEntity.ok().body(response);
    }


    //delete User by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        String response = addressService.delete(id);
        return ResponseEntity.ok().body(response);
    }


    @GetMapping("/getByUserId")
    public AddressDto getByUserId(@RequestParam Integer userId) {
        return addressService.getByUserId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> update(@PathVariable Integer id, @RequestBody AddressDto addressDto){
        var dto = addressService.update(id, addressDto);
        return ResponseEntity.ok().body(dto);
    }
}

