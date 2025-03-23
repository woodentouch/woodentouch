package com.wooden.project.service;

import com.wooden.project.model.Ventes;
import com.wooden.project.repository.VenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class VenteServiceImpl extends BaseServiceImpl<Ventes,Long> implements VenteService{
    @Autowired
    private VenteRepo venteRepository;
    @Override
    public JpaRepository<Ventes, Long> getRepository() {
        return venteRepository;
    }
}
