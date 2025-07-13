package com.example.controller;

import com.example.model.Establishment;
import com.example.service.EstablishmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/establishments")
public class EstablishmentController {
    @Autowired
    private EstablishmentService establishmentService;

    @GetMapping
    public List<Establishment> getAllEstablishments() {
        return establishmentService.getAllEstablishments();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Establishment> updateEstablishment(@PathVariable Long id, @RequestBody Establishment updated) {
        Establishment est = establishmentService.updateEstablishment(id, updated);
        return ResponseEntity.ok(est);
    }
} 