package com.example.backend.controller;

import com.example.backend.entity.News;
import com.example.backend.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable int id) {
        News News = newsService.getNewsById(id);
        return (News != null) ? ResponseEntity.ok(News) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        News createdNews = newsService.createNews(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable int id, @RequestBody News news) {
        News updatedNews = newsService.updateNews(id, news);
        return (updatedNews != null) ? ResponseEntity.ok(news) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable int id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}
