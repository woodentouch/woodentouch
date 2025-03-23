package com.wooden.project.service;

import com.wooden.project.model.*;
import com.wooden.project.repository.eventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl extends BaseServiceImpl<evenement, Long> implements EventService {
    @Autowired
    private eventRepo eventRepository;

    @Override
    protected JpaRepository<evenement, Long> getRepository() {
        return eventRepository;
    }
}