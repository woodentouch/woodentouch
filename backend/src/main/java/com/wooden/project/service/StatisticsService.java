package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.model.Produit;
import com.wooden.project.model.evenement;
import com.wooden.project.model.dto.BestSellerDTO;
import com.wooden.project.repository.*;
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
    private final StockRepository stockRepository;
    private final eventRepo eventRepository;
    private final PanierItemRepository panierItemRepository;

    public StatisticsService(PanierRepo panierRepo, UserRepo UserRepo, StockRepository stockRepository, eventRepo eventRepository, PanierItemRepository panierItemRepository) {
        this.panierRepo = panierRepo;
        this.UserRepo = UserRepo;
        this.stockRepository = stockRepository;
        this.eventRepository = eventRepository;
        this.panierItemRepository = panierItemRepository;
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
        return panierRepo.findTop20ByOrderByDateAjoutDesc();
    }

    public int getCurrentStock() {
        Integer result = stockRepository.totalQuantity();
        return result != null ? result : 0;
    }

    public double getMonthlySales() {
        Double result = panierRepo.monthlySales();
        return result != null ? result : 0.0;
    }

    public java.util.List<BestSellerDTO> getBestSellersLastEvent() {
        evenement last = eventRepository.findTopByOrderByDateFinDesc();
        if (last == null) return java.util.List.of();
        java.util.List<Object[]> rows = panierItemRepository.findBestSellersForEvent(last.getEventId());
        return rows.stream()
                .map(obj -> {
                    Produit p = (Produit) obj[0];
                    Long qty = (Long) obj[1];
                    String name = p.getLicence_id().getName_license() + " " + p.getModele() + " " + p.getTaille();
                    return new BestSellerDTO(name, qty.intValue());
                })
                .toList();
    }
}
