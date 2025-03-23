package com.wooden.project.service;

import com.wooden.project.model.Ventes;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.VenteRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

@Service
public class StatisticsService {

    private final VenteRepo VenteRepo;
    private final UserRepo UserRepo;

    public StatisticsService(VenteRepo VenteRepo, UserRepo UserRepo) {
        this.VenteRepo = VenteRepo;
        this.UserRepo = UserRepo;
    }


    public double getWeeklySales() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        return VenteRepo.WeeklySales(oneWeekAgo);
    }
    public int getNewClients() {
        return VenteRepo.NewClients();
    }

    public double getYearlySales() {
        return VenteRepo.YearlySales();
    }

    public double getChiffreAffaire() {
        return VenteRepo.sumTotalRevenue();
    }

    public List<Ventes> getLast20Sales() {
        return VenteRepo.findTop20ByOrderByDateDesc();
    }
}
