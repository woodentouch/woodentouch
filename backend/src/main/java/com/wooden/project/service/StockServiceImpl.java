package com.wooden.project.service;

import com.wooden.project.model.Panier;
import com.wooden.project.model.Stock;
import com.wooden.project.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl extends BaseServiceImpl<Stock,Long> implements StockService {
    @Autowired
    private StockRepository stockRepository;
    @Override
    protected JpaRepository<Stock, Long> getRepository() {
        return stockRepository;
    }
}
