package com.wooden.project.repository;

import com.wooden.project.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PanierRepo extends JpaRepository<Panier, Long> {
    @Query("SELECT SUM(p.prixPanier) FROM Panier p WHERE p.dateAjout >= :from")
    Double sumPanierSince(@Param("from") java.util.Date from);

    @Query("SELECT SUM(p.prixPanier) FROM Panier p WHERE YEAR(p.dateAjout) = :year")
    Double sumPanierForYear(@Param("year") int year);

    @Query("SELECT SUM(p.prixPanier) FROM Panier p")
    Double sumTotalRevenue();

    java.util.List<Panier> findTop20ByOrderByDateAjoutDesc();
}
