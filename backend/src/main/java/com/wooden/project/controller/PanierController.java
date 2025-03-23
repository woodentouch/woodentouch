package com.wooden.project.controller;

import com.wooden.project.model.Panier;
import com.wooden.project.service.PanierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/paniers")
public class PanierController {
    private final PanierService panierService;

    public PanierController(PanierService panierService) {
        this.panierService = panierService;
    }

    @GetMapping
    public List<Panier> getAllPaniers() {
        return panierService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Panier> getPanierById(@PathVariable Long id) {
        Optional<Panier> panier = panierService.findById(id);
        return panier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Panier createPanier(@RequestBody Panier panier) {
        return panierService.save(panier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePanier(@PathVariable Long id) {
        panierService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}