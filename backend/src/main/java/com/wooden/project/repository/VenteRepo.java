package com.wooden.project.repository;

import com.wooden.project.model.Ventes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface VenteRepo extends JpaRepository<Ventes, Long> {
    @Query("SELECT SUM(v.prix) FROM Ventes v WHERE v.date >= :oneWeekAgo")
    Double WeeklySales(Date oneWeekAgo);

    @Query("SELECT SUM(v.prix) FROM Ventes v WHERE YEAR(v.date) = YEAR(current_date)")
    public Double YearlySales();
    @Query("select COUNT(v.user) from Ventes v")
    public int NewClients();
    @Query("SELECT SUM(v.prix) FROM Ventes v")
    Double sumTotalRevenue();
    List<Ventes> findTop20ByOrderByDateDesc();
}