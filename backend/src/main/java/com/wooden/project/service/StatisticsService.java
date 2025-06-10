package com.wooden.project.service;

import com.wooden.project.model.Ventes;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.VenteRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        Double weeklySales = VenteRepo.WeeklySales(oneWeekAgo);
        return weeklySales != null ? weeklySales : 0.0;
    }
    public int getNewClients() {
        return VenteRepo.NewClients();
    }

    public double getYearlySales() {
        Double yearlySales = VenteRepo.YearlySales();
        return yearlySales != null ? yearlySales : 0.0;
    }

    public double getChiffreAffaire() {
        Double revenue = VenteRepo.sumTotalRevenue();
        return revenue != null ? revenue : 0.0;
    }

    public List<Ventes> getLast20Sales() {
        return VenteRepo.findTop20ByOrderByDateDesc();
    }
}
