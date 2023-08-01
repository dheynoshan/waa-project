package com.example.backend.service;

import com.example.backend.entity.Event;
import com.example.backend.entity.News;

import java.util.List;

public interface NewsService {
    public List<News> getAllNews();

    public News getNewsById(int id);

    public News createNews(News news);

    public News updateNews(int id, News updatedNews);

    public void deleteNews(int id);
}
