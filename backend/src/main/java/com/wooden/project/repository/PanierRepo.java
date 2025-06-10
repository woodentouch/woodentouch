package com.wooden.project.repository;

import com.wooden.project.model.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PanierRepo extends JpaRepository<Panier, Long> {

    @Query("SELECT SUM(p.prix_panier) FROM Panier p WHERE p.date_ajout >= :oneWeekAgo")
    Double weeklySales(Date oneWeekAgo);

    @Query("SELECT SUM(p.prix_panier) FROM Panier p WHERE YEAR(p.date_ajout) = YEAR(current_date)")
    Double yearlySales();

    @Query("SELECT COUNT(p.user) FROM Panier p")
    int newClients();

    @Query("SELECT SUM(p.prix_panier) FROM Panier p")
    Double sumTotalRevenue();

    List<Panier> findTop20ByOrderByDate_ajoutDesc();
}
