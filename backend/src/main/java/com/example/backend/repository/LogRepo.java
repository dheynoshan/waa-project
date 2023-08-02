package com.example.backend.repository;

import com.example.backend.entity.Log;
import org.springframework.data.repository.ListCrudRepository;

public interface LogRepo extends ListCrudRepository<Log, Integer> {
}
