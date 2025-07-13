package com.example.service;

import com.example.model.Establishment;
import com.example.repository.EstablishmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstablishmentService {
    @Autowired
    private EstablishmentRepository establishmentRepository;

    public List<Establishment> getAllEstablishments() {
        return establishmentRepository.findAll();
    }

    public Optional<Establishment> getEstablishmentById(Long id) {
        return establishmentRepository.findById(id);
    }

    public Establishment updateEstablishment(Long id, Establishment updated) {
        return establishmentRepository.findById(id).map(est -> {
            est.setIdentification(updated.getIdentification());
            est.setName(updated.getName());
            est.setAddress(updated.getAddress());
            // Add more fields as needed
            return establishmentRepository.save(est);
        }).orElseThrow(() -> new RuntimeException("Establishment not found"));
    }
} 