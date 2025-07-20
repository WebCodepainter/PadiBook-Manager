package com.padibookmanager.controller;

import com.padibookmanager.model.Penalty;
import com.padibookmanager.service.PenaltyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/penalties")
public class PenaltyController {
    private final PenaltyService penaltyService;

    public PenaltyController(PenaltyService penaltyService) {
        this.penaltyService = penaltyService;
    }

    @GetMapping
    public ResponseEntity<List<Penalty>> getPenalties() {
        return ResponseEntity.ok(penaltyService.getPenalties());
    }

    @PutMapping("/{id}/paid")
    public ResponseEntity<Penalty> markPenaltyPaid(@PathVariable Long id) {
        return ResponseEntity.ok(penaltyService.markPenaltyPaid(id));
    }
}