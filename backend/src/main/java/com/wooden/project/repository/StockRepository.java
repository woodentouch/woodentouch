package com.wooden.project.repository;


import com.wooden.project.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    @org.springframework.data.jpa.repository.Query("SELECT SUM(s.quantite) FROM Stock s")
    Integer totalQuantity();
}
