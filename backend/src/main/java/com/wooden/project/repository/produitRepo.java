package com.wooden.project.repository;

import com.wooden.project.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface produitRepo extends JpaRepository<Produit, Long> {
}
