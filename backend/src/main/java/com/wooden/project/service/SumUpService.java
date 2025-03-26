package com.wooden.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;

@Service
public class SumUpService {

    private final String SUMUP_API_URL = "https://api.sumup.com/v0.1/me/transactions/history";

    public JsonNode fetchTransactions(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                SUMUP_API_URL,
                HttpMethod.GET,
                entity,
                JsonNode.class
        );

        return response.getBody();
    }
}
