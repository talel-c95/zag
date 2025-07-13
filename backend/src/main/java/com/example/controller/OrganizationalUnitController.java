package com.example.controller;

import com.example.model.OrganizationalUnit;
import com.example.service.OrganizationalUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class OrganizationalUnitController {
    @Autowired
    private OrganizationalUnitService organizationalUnitService;

    @GetMapping("/{userId}/organizational-units")
    public ResponseEntity<List<OrganizationalUnit>> getUserOrganizationalUnits(@PathVariable Long userId) {
        List<OrganizationalUnit> units = organizationalUnitService.getOrganizationalUnitsForUser(userId);
        return ResponseEntity.ok(units);
    }
} 