package com.example.backend.repository;


import com.example.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AddressRepo extends JpaRepository<Address, Integer> {


    Address getByUserId(Integer userId);
}



