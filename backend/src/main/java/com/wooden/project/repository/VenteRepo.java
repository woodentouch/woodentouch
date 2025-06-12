package com.wooden.project.repository;

import com.wooden.project.model.Produit;
import com.wooden.project.model.Ventes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VenteRepo extends JpaRepository<Ventes, Long> {
    Optional<Ventes> findByProduct(Produit product);
}
