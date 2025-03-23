package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.repository.PanierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PanierServiceImpl extends BaseServiceImpl<Panier,Long> implements PanierService {
    @Autowired
    private PanierRepo panierRepository;
    @Override
    public PanierRepo getRepository() {
        return panierRepository;
    }
}
