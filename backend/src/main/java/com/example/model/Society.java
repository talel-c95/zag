package com.example.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "societies")
public class Society {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "society_id")
    private Long societyId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(name = "tax_code", nullable = false, unique = true, length = 50)
    private String taxCode;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());

    // Relationships
    @OneToMany(mappedBy = "society", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Establishment> establishments;

    @OneToMany(mappedBy = "society", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FiscalPeriod> fiscalPeriods;

    @OneToMany(mappedBy = "society", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvailableModule> availableModules;

    // Getters and setters
    // ...
} 