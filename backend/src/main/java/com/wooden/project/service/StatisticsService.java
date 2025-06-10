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
        return panierRepo.weeklySales(weekStart);
    }
    public int getNewClients() {
        return panierRepo.newClients();
    }

    public double getYearlySales() {
        return panierRepo.yearlySales();
    }

    public double getChiffreAffaire() {
        return panierRepo.sumTotalRevenue();
    }

    public List<Panier> getLast20Sales() {
        return panierRepo.findTop20ByOrderByDate_ajoutDesc();
    }
}
