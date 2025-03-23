package com.wooden.project.controller;

import com.wooden.project.model.Ventes;
import com.wooden.project.service.VenteService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Ventes")
public class VenteController {

    private final VenteService VentesService;

    public VenteController(VenteService ventesService) {
        VentesService = ventesService;
    }

    @GetMapping
    public List<Ventes> getAllVentess() {
        return VentesService.findAll();
    }

    @PostMapping
    public Ventes createVentes(@RequestBody Ventes Ventes) {
        return VentesService.save(Ventes);
    }
}
