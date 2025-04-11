package com.wooden.project.controller;

import com.wooden.project.model.Produit;
import com.wooden.project.model.licence;
import com.wooden.project.model.User;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.licenceRepo;
import com.wooden.project.repository.produitRepo;
import com.wooden.project.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProductService productService;
    private final produitRepo productRepository;
    private final licenceRepo licenceRepository;
    private final UserRepo userRepository;

    public ProduitController(ProductService productService, produitRepo productRepository,
                            licenceRepo licenceRepository, UserRepo userRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.licenceRepository = licenceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Produit> getAllProduits() {
        return productRepository.findAllWithRelations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Optional<Produit> produit = productRepository.findByIdWithRelations(id);
        return produit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
        // Valider les IDs de licence et user si fournis
        if (produit.getLicence_id() != null && produit.getLicence_id().getId_license() != null) {
            Optional<licence> licence = licenceRepository.findById(produit.getLicence_id().getId_license());
            if (licence.isPresent()) {
                produit.setLicence_id(licence.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }

        if (produit.getUser_id() != null && produit.getUser_id().getId_user() != null) {
            Optional<User> user = userRepository.findById(produit.getUser_id().getId_user());
            if (user.isPresent()) {
                produit.setUser_id(user.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }

        // Sauvegarder via le service
        Produit savedProduit = productService.save(produit);
        return ResponseEntity.ok(savedProduit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        // Vérifier si le produit existe
        Optional<Produit> existingProduit = productRepository.findById(id);
        if (!existingProduit.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Produit existing = existingProduit.get();

        // Mettre à jour la licence si fournie
        if (produit.getLicence_id() != null && produit.getLicence_id().getId_license() != null) {
            Optional<licence> licence = licenceRepository.findById(produit.getLicence_id().getId_license());
            if (licence.isPresent()) {
                existing.setLicence_id(licence.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }

        // Mettre à jour l'utilisateur si fourni
        if (produit.getUser_id() != null && produit.getUser_id().getId_user() != null) {
            Optional<User> user = userRepository.findById(produit.getUser_id().getId_user());
            if (user.isPresent()) {
                existing.setUser_id(user.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }

        // Mettre à jour la taille si fournie
        if (produit.getTaille() != null) {
            existing.setTaille(produit.getTaille());
        }

        // Mettre à jour le modèle si fourni et non vide
        if (produit.getModele() != null && !produit.getModele().isEmpty()) {
            existing.setModele(produit.getModele().trim());
        }

        // Sauvegarder directement via le repository
        Produit savedProduit = productRepository.save(existing);
        return ResponseEntity.ok(savedProduit);
    }
}