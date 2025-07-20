package com.padibookmanager.controller;

import com.padibookmanager.model.Borrow;
import com.padibookmanager.service.BorrowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrows")
public class BorrowController {
    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping
    public ResponseEntity<Borrow> requestBorrow(@RequestBody Borrow borrow) {
        return ResponseEntity.ok(borrowService.requestBorrow(borrow));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Borrow> confirmBorrow(@PathVariable Long id) {
        return ResponseEntity.ok(borrowService.confirmBorrow(id));
    }

    @GetMapping
    public ResponseEntity<List<Borrow>> getBorrows() {
        return ResponseEntity.ok(borrowService.getBorrows());
    }
}