package com.wooden.project.controller;

import com.wooden.project.model.evenement;
import com.wooden.project.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evenements")
public class evenementController {

    private final EventService eventService;

    public evenementController(EventService eventService) {
        this.eventService = eventService;
    }

    // Get all evenements
    @GetMapping
    public List<evenement> getAllEvenements() {
        return eventService.findAll();
    }

    // Get a single evenement by ID
    @GetMapping("/{id}")
    public ResponseEntity<evenement> getEvenementById(@PathVariable Long id) {
        Optional<evenement> evenement = eventService.findById(id);
        return evenement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new evenement
    @PostMapping
    public evenement createEvenement(@RequestBody evenement evenement) {
        return eventService.save(evenement);
    }


    // Delete an evenement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        eventService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}