package com.wooden.project.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooden.project.service.SumUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sumup")
public class SumUpController {

    @Autowired
    private SumUpService sumUpService;

    @GetMapping("/transactions")
    public JsonNode getTransactions() {
        return sumUpService.fetchTransactions();
    }

    @GetMapping("/products")
    public JsonNode getProducts() {
        return sumUpService.fetchProducts();
    }

    @GetMapping("/categories")
    public JsonNode getCategories() {
        return sumUpService.fetchCategories();
    }
}
