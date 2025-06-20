package com.wooden.project.controller;

import com.wooden.project.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.wooden.project.dto.BestSellerDTO;
import com.wooden.project.dto.LicenseStatDTO;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
    private final StatisticsService statisticsService;

    public StatsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }


    @GetMapping("/getWeeklySales")
    public double getWeeklySales() {
        return statisticsService.getWeeklySales();
    }
    
    @GetMapping("/getMonthlySales")
    public double getMonthlySales() {
        return statisticsService.getMonthlySales();
    }

    @GetMapping("/getNewClients")
    public int getNewClients() {
        return statisticsService.getNewClients();
    }


    @GetMapping("/getYearlySales")
    public Double getYearlySales() {
        if (statisticsService.getYearlySales() == 0) {
            return 0.0;
        }
        return statisticsService.getYearlySales();
    }
    
    @GetMapping("/getTotalStockValue")
    public Double getTotalStockValue() {
        return statisticsService.getTotalStockValue();
    }
    
    @GetMapping("/getTotalStockCount")
    public int getTotalStockCount() {
        return statisticsService.getTotalStockCount();
    }


    @GetMapping("/getChiffreAffaire")
    public double getChiffreAffaire() {
        return statisticsService.getChiffreAffaire();
    }


    @GetMapping("/getLast20Sales")
    public Object getLast20Sales() {
        return statisticsService.getLast20Sales();
    }
    
    @GetMapping("/getBestSellersLastEvent")
    public List<BestSellerDTO> getBestSellersLastEvent() {
        return statisticsService.getBestSellersLastEvent();
    }
    
    @GetMapping("/getLicenseSalesStats")
    public List<LicenseStatDTO> getLicenseSalesStats() {
        return statisticsService.getLicenseSalesStats();
    }
}
