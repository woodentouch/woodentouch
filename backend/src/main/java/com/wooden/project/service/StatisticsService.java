package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.PanierRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

@Service
public class StatisticsService {

    private final PanierRepo panierRepo;
    private final UserRepo UserRepo;

    public StatisticsService(PanierRepo panierRepo, UserRepo UserRepo) {
        this.panierRepo = panierRepo;
        this.UserRepo = UserRepo;
    }


    public double getWeeklySales() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        Double res = panierRepo.sumPanierSince(java.sql.Date.valueOf(oneWeekAgo));
        return res != null ? res : 0;
    }
    public int getNewClients() {
        return (int) UserRepo.count();
    }

    public double getYearlySales() {
        int year = Year.now().getValue();
        Double res = panierRepo.sumPanierForYear(year);
        return res != null ? res : 0;
    }

    public double getChiffreAffaire() {
        Double res = panierRepo.sumTotalRevenue();
        return res != null ? res : 0;
    }

    public List<Panier> getLast20Sales() {
        return panierRepo.findTop20ByOrderByDateAjoutDesc();
    }
}
