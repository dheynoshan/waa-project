package com.example.backend.service;

import com.example.backend.entity.Event;

import java.util.List;

public interface EventService {
    public List<Event> getAllEvents();

    public Event getEventById(int id);

    public Event createEvent(Event event);

    public Event updateEvent(int id, Event updatedEvent);

    public void deleteEvent(int id);
}
