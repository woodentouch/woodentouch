package com.wooden.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooden.project.model.Panier;
import com.wooden.project.model.PanierItem;
import com.wooden.project.model.Produit;
import com.wooden.project.model.licence;
import com.wooden.project.repository.PanierRepo;
import com.wooden.project.repository.produitRepo;
import com.wooden.project.repository.licenceRepo;
import com.wooden.project.service.PanierService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SumUpSyncService {

    private final SumUpService sumUpService;
    private final licenceRepo licenceRepository;
    private final produitRepo productRepository;
    private final PanierRepo panierRepository;
    private final PanierService panierService;

    public SumUpSyncService(SumUpService sumUpService,
                           licenceRepo licenceRepository,
                           produitRepo productRepository,
                           PanierRepo panierRepository,
                           PanierService panierService) {
        this.sumUpService = sumUpService;
        this.licenceRepository = licenceRepository;
        this.productRepository = productRepository;
        this.panierRepository = panierRepository;
        this.panierService = panierService;
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

        JsonNode transactions = sumUpService.fetchTransactions();
        if (transactions != null && transactions.isArray()) {
            for (JsonNode tx : transactions) {
                String txId = tx.path("transaction_code").asText(tx.path("id").asText(null));
                if (txId == null || panierRepository.findBySumupId(txId).isPresent()) {
                    continue;
                }
                double amount = tx.path("amount").asDouble(tx.path("amount" + "_value").asDouble(0.0));
                String paymentType = tx.path("payment_type").asText("SUMUP");
                java.util.Date date = null;
                String dateStr = tx.path("timestamp").asText(tx.path("created_at").asText(null));
                if (dateStr != null) {
                    try {
                        java.time.Instant instant = java.time.Instant.parse(dateStr);
                        date = java.util.Date.from(instant);
                    } catch (Exception ignored) {}
                }
                if (date == null) {
                    date = new java.util.Date();
                }

                java.util.List<PanierItem> items = new java.util.ArrayList<>();
                JsonNode prods = tx.path("items");
                if (prods != null && prods.isArray()) {
                    for (JsonNode itemNode : prods) {
                        String name = itemNode.path("name").asText(itemNode.path("product_name").asText(null));
                        String catName = itemNode.path("category_name").asText(null);
                        int quantity = itemNode.path("quantity").asInt(1);
                        double price = itemNode.path("amount").asDouble(amount);

                        Produit prodEntity = ensureProduct(name, catName);
                        PanierItem item = new PanierItem();
                        item.setProduit(prodEntity);
                        item.setQuantite(quantity);
                        item.setPrix_unitaire(price);
                        items.add(item);
                    }
                } else {
                    String name = tx.path("product_name").asText(null);
                    if (name != null) {
                        Produit prodEntity = ensureProduct(name, null);
                        PanierItem item = new PanierItem();
                        item.setProduit(prodEntity);
                        item.setQuantite(1);
                        item.setPrix_unitaire(amount);
                        items.add(item);
                    }
                }

                Panier panier = new Panier(txId, date, paymentType, amount);
                panier.setItems(items);
                panierService.createPanierWithItems(panier);
            }
        }
    }

    private Produit ensureProduct(String model, String categoryName) {
        if (model == null) {
            return null;
        }
        Optional<Produit> existing = productRepository.findByModele(model);
        if (existing.isPresent()) {
            return existing.get();
        }
        licence lic = null;
        if (categoryName != null) {
            lic = licenceRepository.findByNameLicense(categoryName)
                    .orElseGet(() -> licenceRepository.save(new licence(categoryName)));
        }
        Produit p = new Produit();
        p.setModele(model);
        p.setLicence_id(lic);
        return productRepository.save(p);
    }
}
