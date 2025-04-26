package com.project.expensetracker.web;

import com.project.expensetracker.services.FastApiService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class FastApiResource {

    private final FastApiService fastApiService;

    public FastApiResource(FastApiService fastApiService) {
        this.fastApiService = fastApiService;
    }

    @PostMapping("/predict")
    public Map<String, Object> predict() {
        return fastApiService.predictExpenses();
    }
}
