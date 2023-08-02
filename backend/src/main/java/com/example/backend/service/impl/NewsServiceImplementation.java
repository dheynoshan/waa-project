package com.example.backend.service.impl;

import com.example.backend.entity.Event;
import com.example.backend.entity.News;
import com.example.backend.repository.NewsRepository;
import com.example.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class NewsServiceImplementation implements NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Override
    public List<News> getAllNews() {
        List<News> notDeletedNews = new ArrayList<>();
        List<News> news = newsRepository.findAll();
        for (News mynews : news) {
            if (!mynews.getDeleted()) {
                notDeletedNews.add(mynews);
            }
        }
        return notDeletedNews;
    }

    @Override
    public News getNewsById(int id) {
        News news = newsRepository.findById(id).orElse(null);
        if(!news.getDeleted()){
            return news;
        }
        return null;
    }

    @Override
    public News createNews(News news) {
        return newsRepository.save(news);
    }

    @Override
    public News updateNews(int id, News updatedNews) {

        News news = newsRepository.findById(id).orElse(null);
        if(!news.getDeleted()) {

            if (Objects.nonNull(updatedNews.getPostedDate()) && !updatedNews.getPostedDate().equals(null)) {
                news.setPostedDate(updatedNews.getPostedDate());
            }

            if (Objects.nonNull(updatedNews.getDetails()) && !"".equalsIgnoreCase(updatedNews.getDetails())) {
                news.setDetails(updatedNews.getDetails());
            }

            return newsRepository.save(news);
        }
        return null;
    }

    @Override
    public void deleteNews(int id) {
        News news = newsRepository.findById(id).orElse(null);
        if(news != null && news.getDeleted() != true) {
            news.setDeleted(true);
            newsRepository.save(news);
        }
    }
}
