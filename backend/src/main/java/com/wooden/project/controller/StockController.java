package com.wooden.project.controller;

import com.wooden.project.model.Stock;
import com.wooden.project.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    private StockService stockService;
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }
    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.findAll();
    }
    @GetMapping("/{id}")
    public Stock getStockById(Long id) {
        return stockService.findById(id).orElse(null);
    }
    @PostMapping
    public Stock createStock(Stock stock) {
        return stockService.save(stock);
    }
    @DeleteMapping("/{id}")
    public void deleteStock(Long id) {
        stockService.deleteById(id);
    }
}
