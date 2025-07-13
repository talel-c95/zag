package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "cost_centers")
public class CostCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cost_center_id")
    private Long costCenterId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizational_unit_id", nullable = false)
    private OrganizationalUnit organizationalUnit;

    @Column(name = "cost_center_code", nullable = false, length = 50)
    private String costCenterCode;

    @Column(name = "description")
    private String description;

    // Getters and setters
    // ...
} 