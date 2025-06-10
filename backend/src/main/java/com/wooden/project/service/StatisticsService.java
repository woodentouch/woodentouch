package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.PanierRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;
import java.util.Date;
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
        Date weekStart = Date.from(oneWeekAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Double result = panierRepo.weeklySales(weekStart);
        return result != null ? result : 0.0;
    }
    public int getNewClients() {
        return panierRepo.newClients();
    }

    public double getYearlySales() {
        Double result = panierRepo.yearlySales();
        return result != null ? result : 0.0;
    }

    public double getChiffreAffaire() {
        Double result = panierRepo.sumTotalRevenue();
        return result != null ? result : 0.0;
    }

    public List<Panier> getLast20Sales() {
        return panierRepo.findTop20ByOrderByDate_ajoutDesc();
    }
}
