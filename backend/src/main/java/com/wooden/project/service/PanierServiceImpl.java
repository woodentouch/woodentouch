package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.model.PanierItem;
import com.wooden.project.model.Ventes;
import com.wooden.project.repository.PanierItemRepository;
import com.wooden.project.repository.PanierRepo;
import com.wooden.project.repository.VenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PanierServiceImpl extends BaseServiceImpl<Panier,Long> implements PanierService {
    @Autowired
    private PanierRepo panierRepository;

    @Autowired
    private VenteRepo venteRepository;

    @Autowired
    private PanierItemRepository panierItemRepository;
    @Override
    public PanierRepo getRepository() {
        return panierRepository;
    }


    private void updateVentes(PanierItem item) {
        venteRepository.findByProduct(item.getProduit())
                .ifPresentOrElse(v -> {
                    v.setNombreVentes(v.getNombreVentes() + item.getQuantite());
                    v.setPrixTotal(v.getPrixTotal() + item.getPrix_unitaire() * item.getQuantite());
                    venteRepository.save(v);
                }, () -> {
                    Ventes v = new Ventes(item.getProduit(), item.getQuantite(), item.getPrix_unitaire() * item.getQuantite());
                    venteRepository.save(v);
                });
    }

    @Override
    public Panier createPanierWithItems(Panier panier) {
        Panier savedPanier = panierRepository.save(panier);
        if (panier.getItems() != null) {
            for (PanierItem item : panier.getItems()) {
                item.setPanier(savedPanier);
                panierItemRepository.save(item);
                updateVentes(item);
            }
        }
        return savedPanier;
    }

    @Override
    public PanierItem addItem(Long panierId, PanierItem item) {
        Panier panier = panierRepository.findById(panierId).orElseThrow();
        item.setPanier(panier);
        PanierItem saved = panierItemRepository.save(item);
        updateVentes(saved);
        return saved;
    }

    @Override
    public void removeItem(Long itemId) {
        panierItemRepository.deleteById(itemId);
    }

    @Override
    public PanierItem updateItemQuantity(Long itemId, int quantity) {
        PanierItem item = panierItemRepository.findById(itemId).orElseThrow();
        item.setQuantite(quantity);
        return panierItemRepository.save(item);
    }

    @Override
    public java.util.List<PanierItem> getItems(Long panierId) {
        return panierItemRepository.findByPanierId(panierId);
    }
}
