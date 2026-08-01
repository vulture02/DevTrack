package devtrack.controller;


import devtrack.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/api/dashboard")
@RestController
@RequiredArgsConstructor

public class DashboardController {
    private final DashboardService service;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(service.getDashboardStats());
    }
}
