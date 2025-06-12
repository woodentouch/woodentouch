package com.wooden.project.repository;


import com.wooden.project.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    @Query("SELECT s FROM Stock s WHERE s.id_produit.licence_id.id_license = :licenseId")
    List<Stock> findByLicenseId(Long licenseId);

    /**
     * Search stocks by product model. Case-insensitive.
     */
    @Query("SELECT s FROM Stock s WHERE LOWER(s.id_produit.modele) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Stock> searchByProductName(String query);
}
