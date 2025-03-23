package com.wooden.project.controller;

import com.wooden.project.model.evenement;
import com.wooden.project.service.EventService;
import com.wooden.project.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evenements")
public class evenementController {

    private final EventService EventService;

    public evenementController(EventService EventService) {
        this.EventService = EventService;
    }

    // Get all evenements
    @GetMapping
    public List<evenement> getAllEvenements() {
        return EventService.findAll();
    }

    // Get a single evenement by ID
    @GetMapping("/{id}")
    public ResponseEntity<evenement> getEvenementById(@PathVariable Long id) {
        Optional<evenement> evenement = EventService.findById(id);
        return evenement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new evenement
    @PostMapping
    public evenement createEvenement(@RequestBody evenement evenement) {
        return EventService.save(evenement);
    }


    // Delete an evenement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        EventService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}