package com.wooden.project.controller;

import com.wooden.project.model.Panier;
import com.wooden.project.model.PanierItem;
import com.wooden.project.model.Produit;
import com.wooden.project.service.PanierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return panierService.createPanierWithItems(panier);
    }

    @PostMapping("/{id}/items")
    public PanierItem addItem(@PathVariable Long id, @RequestBody PanierItem item) {
        return panierService.addItem(id, item);
    }

    @PutMapping("/items/{itemId}")
    public PanierItem updateItemQuantity(@PathVariable Long itemId, @RequestParam int quantity) {
        return panierService.updateItemQuantity(itemId, quantity);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        panierService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Panier> updatePanier(@PathVariable Long id, @RequestBody Panier panier) {
        Optional<Panier> existing = panierService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Panier toUpdate = existing.get();
        toUpdate.setMode_paiement(panier.getMode_paiement());
        toUpdate.setPrix_panier(panier.getPrix_panier());
        toUpdate.setEvent(panier.getEvent());
        toUpdate.setDateAjout(panier.getDateAjout());
        return ResponseEntity.ok(panierService.createPanierWithItems(toUpdate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePanier(@PathVariable Long id) {
        panierService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/latest-sales")
    public List<Map<String, Object>> getLatestSales() {
        List<Panier> latestPaniers = panierService.findLatest20();

        return latestPaniers.stream().map(panier -> {
            Map<String, Object> panierData = new HashMap<>();
            panierData.put("panierId", panier.getId_panier());
            panierData.put("dateAjout", panier.getDateAjout());
            String eventName = panier.getEvent() != null ? panier.getEvent().getNom() : "N/A";
            panierData.put("canal_de_vente", eventName);

            List<Map<String, Object>> items = panier.getItems().stream().map(item -> {
                Map<String, Object> itemData = new HashMap<>();
                Produit produit = item.getProduit();
                String productInfo = produit.getModele();
                itemData.put("vente", productInfo);
                itemData.put("prix", item.getPrix_unitaire() + "€");
                return itemData;
            }).collect(Collectors.toList());

            panierData.put("items", items);
            return panierData;
        }).collect(Collectors.toList());
    }
}