package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.model.Ventes;
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
    @Override
    public PanierRepo getRepository() {
        return panierRepository;
    }

    @Override
    public Panier save(Panier entity) {
        Panier saved = super.save(entity);
        venteRepository.findByProduct(entity.getProduit())
                .ifPresentOrElse(v -> {
                    v.setNombreVentes(v.getNombreVentes() + 1);
                    v.setPrixTotal(v.getPrixTotal() + entity.getPrix_panier());
                    venteRepository.save(v);
                }, () -> {
                    Ventes v = new Ventes(entity.getProduit(), 1, entity.getPrix_panier());
                    venteRepository.save(v);
                });
        return saved;
    }
}
