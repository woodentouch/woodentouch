package com.wooden.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class SumUpService {

    private static final String TRANSACTIONS_URL = "https://api.sumup.com/v0.1/me/transactions/history";
    private static final String PRODUCTS_URL = "https://api.sumup.com/v0.1/me/products";
    private static final String CATEGORIES_URL = "https://api.sumup.com/v0.1/me/products/categories";

    @Value("${sumup.access.token:}")
    private String configuredAccessToken;

    public JsonNode fetchTransactions(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                TRANSACTIONS_URL,
                HttpMethod.GET,
                entity,
                JsonNode.class
        );

        return response.getBody();
    }

    public JsonNode fetchTransactions() {
        return fetchTransactions(configuredAccessToken);
    }

    public JsonNode fetchProducts() {
        return fetchApi(PRODUCTS_URL);
    }

    public JsonNode fetchCategories() {
        return fetchApi(CATEGORIES_URL);
    }

    private JsonNode fetchApi(String url) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(configuredAccessToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<JsonNode> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                JsonNode.class
        );
        return response.getBody();
    }
}
