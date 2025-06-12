package com.wooden.project.repository;

import com.wooden.project.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> {
    // Get total stock count across all products
    @Query("SELECT SUM(s.quantite) FROM Stock s")
    Integer getTotalStockCount();
    
    // Get total stock value - using average price from sold items
    @Query(value = "SELECT SUM(s.quantite * (SELECT AVG(pi.prix_unitaire) FROM panier_items pi WHERE pi.id_produit = s.id_produit)) FROM stock s", nativeQuery = true)
    Double getTotalStockValue();
}
