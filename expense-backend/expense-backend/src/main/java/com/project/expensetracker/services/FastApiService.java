package com.project.expensetracker.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class FastApiService {
    private static final Logger LOGGER = Logger.getLogger(FastApiService.class.getName());
    private final RestTemplate restTemplate = new RestTemplate();
    private final String FASTAPI_URL = "https://be15-34-74-99-40.ngrok-free.app/predict"; // ✅ ngrok URL

    public Map<String, Object> predictExpenses() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>("{}", headers); // ✅ Empty JSON object

            ResponseEntity<Map> response = restTemplate.postForEntity(FASTAPI_URL, request, Map.class);
            return response.getBody();
        } catch (HttpStatusCodeException e) {
            LOGGER.severe("FastAPI returned error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return Map.of("error", "FastAPI returned an error: " + e.getStatusCode());
        } catch (RestClientException e) {
            LOGGER.severe("Error connecting to FastAPI: " + e.getMessage());
            return Map.of("error", "Could not connect to FastAPI");
        }
    }
}
