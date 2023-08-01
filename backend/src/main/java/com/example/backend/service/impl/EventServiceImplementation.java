package com.example.backend.service.impl;

import com.example.backend.entity.Event;
import com.example.backend.repository.EventRepository;
import com.example.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class EventServiceImplementation implements EventService {
    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Event> getAllEvents() {
        List<Event> notDeletedEvents = new ArrayList<>();
        List<Event> events = eventRepository.findAll();
        for (Event event : events) {
            if (!event.getDeleted()) {
                notDeletedEvents.add(event);
            }
        }
        return notDeletedEvents;
    }

    @Override
    public Event getEventById(int id) {
        Event evt = eventRepository.findById(id).orElse(null);
        if(!evt.getDeleted()){
            return evt;
        }
        return null;
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(int id, Event updatedevent) {
        Event evt = eventRepository.findById(id).orElse(null);
        if(!evt.getDeleted()){
            if (Objects.nonNull(updatedevent.getName()) && !"".equalsIgnoreCase(updatedevent.getName())) {
                evt.setName(updatedevent.getName());
            }

            if (Objects.nonNull(updatedevent.getType()) && !"".equalsIgnoreCase(updatedevent.getType())) {
                evt.setType(updatedevent.getType());
            }

            if (Objects.nonNull(updatedevent.getLocation()) && !"".equalsIgnoreCase(updatedevent.getLocation())) {
                evt.setLocation(updatedevent.getLocation());
            }

            if (Objects.nonNull(updatedevent.getEventDate()) && !updatedevent.getEventDate().equals(null)) {
                evt.setEventDate(updatedevent.getEventDate());
            }

            return eventRepository.save(evt);
        }
        return null;
    }


    @Override
    public void deleteEvent(int id) {
        Event evt = eventRepository.findById(id).orElse(null);
        if(evt != null && evt.getDeleted() != true) {
            evt.setDeleted(true);
            eventRepository.save(evt);
        }
    }
}
