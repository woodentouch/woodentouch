package com.wooden.project.controller;

import com.wooden.project.dto.ProductDTO;
import com.wooden.project.model.Produit;
import com.wooden.project.model.Stock;
import com.wooden.project.model.Taille;
import com.wooden.project.model.licence;
import com.wooden.project.repository.produitRepo;
import com.wooden.project.repository.licenceRepo;
import com.wooden.project.repository.StockRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class InventoryController {
    private final licenceRepo licenceRepository;
    private final produitRepo productRepository;
    private final StockRepository stockRepository;

    public InventoryController(licenceRepo licenceRepository, produitRepo productRepository, StockRepository stockRepository) {
        this.licenceRepository = licenceRepository;
        this.productRepository = productRepository;
        this.stockRepository = stockRepository;
    }

    @GetMapping("/licenses")
    public List<licence> getLicenses() {
        return licenceRepository.findAll();
    }

    @PostMapping("/addLicense")
    public licence addLicense(@RequestBody licence lic) {
        lic.setId_license(null);
        return licenceRepository.save(lic);
    }

    @GetMapping("/products/{licenseId}")
    public List<ProductDTO> getProducts(@PathVariable Long licenseId) {
        List<Stock> stocks = stockRepository.findByLicenseId(licenseId);
        return stocks.stream()
                .map(s -> new ProductDTO(
                        s.getId_produit().getId_produit(),
                        s.getId_produit().getModele(),
                        s.getQuantite(),
                        s.getStockMinimum()
                ))
                .collect(Collectors.toList());
    }

    public static class AddProductRequest {
        public Long licenseId;
        public String model;
        public int quantity;
        public int stockMinimum;
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Void> addProduct(@RequestBody AddProductRequest request) {
        Optional<licence> licOpt = licenceRepository.findById(request.licenseId);
        if (licOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Produit produit = new Produit();
        produit.setLicence_id(licOpt.get());
        produit.setModele(request.model);
        produit.setTaille(Taille.S);
        Produit savedProduct = productRepository.save(produit);
        Stock stock = new Stock(savedProduct, request.quantity, request.stockMinimum);
        stockRepository.save(stock);
        return ResponseEntity.ok().build();
    }
}
