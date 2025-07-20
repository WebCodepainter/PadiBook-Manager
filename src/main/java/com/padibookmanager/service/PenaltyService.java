package com.padibookmanager.service;

import com.padibookmanager.model.Penalty;
import com.padibookmanager.repository.PenaltyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PenaltyService {
    private final PenaltyRepository penaltyRepository;

    public PenaltyService(PenaltyRepository penaltyRepository) {
        this.penaltyRepository = penaltyRepository;
    }

    public List<Penalty> getPenalties() {
        return penaltyRepository.findAll();
    }

    public Penalty markPenaltyPaid(Long id) {
        Penalty penalty = penaltyRepository.findById(id).orElseThrow(() -> new RuntimeException("Penalty not found"));
        penalty.setPaid(true);
        return penaltyRepository.save(penalty);
    }
}