package com.wooden.project.controller;

import com.wooden.project.model.Panier;
import com.wooden.project.model.Ventes;
import com.wooden.project.service.PanierService;
import com.wooden.project.service.VenteService;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Ventes")
public class VenteController {

    private final VenteService VentesService;
    private final PanierService panierService;

    public VenteController(VenteService ventesService, PanierService panierService) {
        this.panierService = panierService;
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

    @PostMapping("/register")
    public Panier registerSale(@RequestBody Panier panier) {
        panier.setMode_paiement("espece");
        if (panier.getDateAjout() == null) {
            panier.setDateAjout(new Date());
        }
        return panierService.createPanierWithItems(panier);
    }
}
