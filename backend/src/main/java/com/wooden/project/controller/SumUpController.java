package com.wooden.project.controller;
import com.fasterxml.jackson.databind.JsonNode;
import com.wooden.project.service.SumUpService; // Remplace par le package réel de ton service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sumup")

public class SumUpController {

    @Autowired
    private SumUpService sumUpService;

    @GetMapping("/transactions/test")
    public JsonNode getTransactionsTest() {
        // Test rapide avec ton token en dur (uniquement pour test rapide)
        String accessToken = "at_classic_3Es9oM9i0sEL5LTvBZK3PoR6oyPXOwgUyXmywpIBwEsZkd4CcLRZO";
        return sumUpService.fetchTransactions(accessToken);
    }
    
}
// http://localhost:8080/api/sumup/transactions/test
