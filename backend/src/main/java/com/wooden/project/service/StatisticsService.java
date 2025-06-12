package com.wooden.project.service;

import com.wooden.project.dto.BestSellerDTO;
import com.wooden.project.dto.LicenseStatDTO;
import com.wooden.project.model.Panier;
import com.wooden.project.model.evenement;
import com.wooden.project.repository.UserRepo;
import com.wooden.project.repository.PanierRepo;
import com.wooden.project.repository.StockRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StatisticsService {

    private final PanierRepo panierRepo;
    private final UserRepo userRepo;
    private final StockRepo stockRepo;

    public StatisticsService(PanierRepo panierRepo, UserRepo userRepo, StockRepo stockRepo) {
        this.panierRepo = panierRepo;
        this.userRepo = userRepo;
        this.stockRepo = stockRepo;
    }


    public double getWeeklySales() {
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        Date weekStart = Date.from(oneWeekAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Double result = panierRepo.weeklySales(weekStart);
        return result != null ? result : 0.0;
    }
    
    public double getMonthlySales() {
        Double result = panierRepo.monthlySales();
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
    
    public double getTotalStockValue() {
        Double result = stockRepo.getTotalStockValue();
        return result != null ? result : 0.0;
    }
    
    public int getTotalStockCount() {
        Integer result = stockRepo.getTotalStockCount();
        return result != null ? result : 0;
    }

    public List<Panier> getLast20Sales() {
        return panierRepo.findTop20ByOrderByDateAjoutDesc();
    }
    
    public List<BestSellerDTO> getBestSellersLastEvent() {
        // Get the latest event first
        List<evenement> latestEvents = panierRepo.findLatestEvent();
        if (latestEvents.isEmpty()) {
            return new ArrayList<>();
        }
        
        evenement latestEvent = latestEvents.get(0);
        
        List<java.util.Map<String, Object>> results = panierRepo.findBestSellersByEvent(latestEvent);
        List<BestSellerDTO> bestSellers = new ArrayList<>();
        
        for (java.util.Map<String, Object> result : results) {
            String productName = (String) result.get("productName");
            String licenseName = (String) result.get("licenseName");
            Integer quantitySold = ((Number) result.get("quantitySold")).intValue();
            Double total = ((Number) result.get("total")).doubleValue();
            
            bestSellers.add(new BestSellerDTO(productName, licenseName, quantitySold, total));
        }
        
        // Return top 10 only
        return bestSellers.stream().limit(10).collect(java.util.stream.Collectors.toList());
    }
    
    public List<LicenseStatDTO> getLicenseSalesStats() {
        List<java.util.Map<String, Object>> results = panierRepo.findLicenseSalesStats();
        List<LicenseStatDTO> stats = new ArrayList<>();
        
        // Calculate total
        long total = results.stream()
                     .mapToLong(result -> ((Number) result.get("count")).longValue())
                     .sum();
        
        if (total == 0) {
            return new ArrayList<>();
        }
        
        // Calculate percentages
        for (java.util.Map<String, Object> result : results) {
            String licenseName = (String) result.get("licenseName");
            Long count = ((Number) result.get("count")).longValue();
            Double percentage = (count * 100.0) / total;
            
            // Round to one decimal place
            percentage = Math.round(percentage * 10) / 10.0;
            
            stats.add(new LicenseStatDTO(licenseName, count, percentage));
        }
        
        return stats;
    }
}
