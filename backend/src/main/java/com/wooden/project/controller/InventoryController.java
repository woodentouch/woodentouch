package com.wooden.project.controller;

import com.wooden.project.dto.ProductDTO;
import com.wooden.project.dto.Result;
import com.wooden.project.model.Produit;
import com.wooden.project.model.Stock;
import com.wooden.project.model.Taille;
import com.wooden.project.model.licence;
import com.wooden.project.repository.produitRepo;
import com.wooden.project.repository.licenceRepo;
import com.wooden.project.repository.StockRepository;
import com.wooden.project.repository.PanierItemRepository;
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
    private final PanierItemRepository panierItemRepository;

    public InventoryController(licenceRepo licenceRepository, produitRepo productRepository, StockRepository stockRepository, PanierItemRepository panierItemRepository) {
        this.licenceRepository = licenceRepository;
        this.productRepository = productRepository;
        this.stockRepository = stockRepository;
        this.panierItemRepository = panierItemRepository;
    }

    @GetMapping("/licenses")
    public Result<List<licence>> getLicenses() {
        List<licence> all = licenceRepository.findAll();
        return Result.success(all);
    }

    @PostMapping("/addLicense")
    public licence addLicense(@RequestBody licence lic) {
        lic.setId_license(null);
        return licenceRepository.save(lic);
    }

    @GetMapping("/products/{licenseId}")
    public Result<List<ProductDTO>> getProductsPath(@PathVariable Long licenseId) {
        return getProducts(licenseId);
    }

    @GetMapping("/products")
    public Result<List<ProductDTO>> getProducts(@RequestParam(value = "licenseId", required = false) Long licenseId) {
        List<Stock> stocks = licenseId != null ? stockRepository.findByLicenseId(licenseId) : stockRepository.findAll();
        List<ProductDTO> products = stocks.stream()
                .map(s -> {
                    Double avg = panierItemRepository.getAveragePriceByProductId(s.getId_produit().getId_produit());
                    double value = (avg != null ? avg : 0) * s.getQuantite();
                    return new ProductDTO(
                            s.getId_produit().getLicence_id().getId_license(),
                            s.getId_produit().getId_produit(),
                            s.getId_produit().getModele(),
                            s.getId_produit().getTaille().name(),
                            s.getQuantite(),
                            s.getStockMinimum() != null ? s.getStockMinimum() : 0,
                            value
                    );
                })
                .collect(Collectors.toList());
        return Result.success(products);
    }

    @GetMapping("/products/search")
    public Result<List<ProductDTO>> searchProducts(@RequestParam("q") String query) {
        List<Stock> stocks = stockRepository.searchByProductName(query);
        List<ProductDTO> products = stocks.stream()
                .map(s -> {
                    Double avg = panierItemRepository.getAveragePriceByProductId(s.getId_produit().getId_produit());
                    double value = (avg != null ? avg : 0) * s.getQuantite();
                    return new ProductDTO(
                            s.getId_produit().getLicence_id().getId_license(),
                            s.getId_produit().getId_produit(),
                            s.getId_produit().getModele(),
                            s.getId_produit().getTaille().name(),
                            s.getQuantite(),
                            s.getStockMinimum() != null ? s.getStockMinimum() : 0,
                            value
                    );
                })
                .collect(Collectors.toList());
        return Result.success(products);
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
