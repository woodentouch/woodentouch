package com.wooden.project.service;

import com.wooden.project.model.Produit;
import com.wooden.project.repository.produitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl extends BaseServiceImpl<Produit, Long> implements ProductService {

    @Autowired
    private produitRepo productRepository;

    @Override
    public JpaRepository<Produit, Long> getRepository() {
        return productRepository;
    }
}