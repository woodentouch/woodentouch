package com.wooden.project.repository;

import com.wooden.project.model.Panier;
import com.wooden.project.model.evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface PanierRepo extends JpaRepository<Panier, Long> {

    @Query("SELECT SUM(p.prix_panier) FROM Panier p WHERE p.dateAjout >= :oneWeekAgo")
    Double weeklySales(Date oneWeekAgo);
    
    @Query("SELECT SUM(p.prix_panier) FROM Panier p WHERE MONTH(p.dateAjout) = MONTH(current_date) AND YEAR(p.dateAjout) = YEAR(current_date)")
    Double monthlySales();

    @Query("SELECT SUM(p.prix_panier) FROM Panier p WHERE YEAR(p.dateAjout) = YEAR(current_date)")
    Double yearlySales();

    @Query("SELECT COUNT(p.user) FROM Panier p")
    int newClients();

    @Query("SELECT SUM(p.prix_panier) FROM Panier p")
    Double sumTotalRevenue();

    // Retrieve recent sales but skip baskets that ended up empty
    @Query("SELECT p FROM Panier p " +
            "WHERE EXISTS (SELECT 1 FROM PanierItem pi WHERE pi.panier = p) " +
            "ORDER BY p.dateAjout DESC")
    List<Panier> findLatestWithItems(org.springframework.data.domain.Pageable pageable);

    // Returns the most recent event that actually has at least one sale
    // We order by end date, start date and id to handle overlapping events
    @Query("SELECT e FROM evenement e "
            + "WHERE EXISTS (SELECT 1 FROM Panier p WHERE p.event = e) "
            + "ORDER BY e.dateFin DESC, e.dateDebut DESC, e.eventId DESC")
    List<evenement> findLatestEventWithSales();

    @Query("SELECT new map(pi.produit.modele as productName, pi.produit.licence_id.name_license as licenseName, SUM(pi.quantite) as quantitySold, SUM(pi.quantite * pi.prix_unitaire) as total) " +
           "FROM PanierItem pi WHERE pi.panier.event = :event " +
           "GROUP BY pi.produit.modele, pi.produit.licence_id.name_license " +
           "ORDER BY SUM(pi.quantite) DESC")
    List<Map<String, Object>> findBestSellersByEvent(@Param("event") evenement event);

    @Query("SELECT new map(l.name_license as licenseName, COUNT(pi) as count) " +
           "FROM PanierItem pi JOIN pi.produit.licence_id l WHERE YEAR(pi.panier.dateAjout) = YEAR(CURRENT_DATE) " +
           "GROUP BY l.name_license")
    List<Map<String, Object>> findLicenseSalesStats();
}
