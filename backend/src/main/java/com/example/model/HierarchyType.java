package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "hierarchy_types")
public class HierarchyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hierarchy_type_id")
    private Long hierarchyTypeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizational_unit_id", nullable = false)
    private OrganizationalUnit organizationalUnit;

    @Column(name = "type_name", nullable = false, length = 50)
    private String typeName;

    // Getters and setters
    // ...
} 