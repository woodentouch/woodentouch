package com.wooden.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooden.project.model.Produit;
import com.wooden.project.model.licence;
import com.wooden.project.repository.produitRepo;
import com.wooden.project.repository.licenceRepo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SumUpSyncService {

    private final SumUpService sumUpService;
    private final licenceRepo licenceRepository;
    private final produitRepo productRepository;

    public SumUpSyncService(SumUpService sumUpService, licenceRepo licenceRepository, produitRepo productRepository) {
        this.sumUpService = sumUpService;
        this.licenceRepository = licenceRepository;
        this.productRepository = productRepository;
    }

    @Scheduled(fixedRate = 600000)
    public void syncFromSumUp() {
        JsonNode categories = sumUpService.fetchCategories();
        if (categories != null && categories.isArray()) {
            for (JsonNode cat : categories) {
                String name = cat.path("name").asText(null);
                if (name != null && licenceRepository.findByNameLicense(name).isEmpty()) {
                    licenceRepository.save(new licence(name));
                }
            }
        }

        JsonNode products = sumUpService.fetchProducts();
        if (products != null && products.isArray()) {
            for (JsonNode prod : products) {
                String model = prod.path("name").asText(null);
                String categoryName = prod.path("category_name").asText(null);
                if (model == null) {
                    continue;
                }
                Optional<Produit> existing = productRepository.findByModele(model);
                if (existing.isPresent()) {
                    continue;
                }
                licence lic = null;
                if (categoryName != null) {
                    lic = licenceRepository.findByNameLicense(categoryName).orElseGet(() -> licenceRepository.save(new licence(categoryName)));
                }
                Produit p = new Produit();
                p.setModele(model);
                p.setLicence_id(lic);
                productRepository.save(p);
            }
        }
    }
}
