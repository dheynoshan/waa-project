package com.example.backend.repository;

import com.example.backend.entity.News;
import org.springframework.data.repository.ListCrudRepository;

public interface NewsRepository extends ListCrudRepository<News, Integer> {
}
