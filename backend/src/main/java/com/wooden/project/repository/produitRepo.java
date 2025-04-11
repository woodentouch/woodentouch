package com.wooden.project.repository;

import com.wooden.project.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface produitRepo extends JpaRepository<Produit, Long> {

    @Query("SELECT p FROM Produit p LEFT JOIN FETCH p.licence_id LEFT JOIN FETCH p.user_id")
    List<Produit> findAllWithRelations();

    @Query("SELECT p FROM Produit p LEFT JOIN FETCH p.licence_id LEFT JOIN FETCH p.user_id WHERE p.id_produit = :id")
    Optional<Produit> findByIdWithRelations(Long id);
}