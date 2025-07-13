package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "available_modules")
public class AvailableModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id")
    private Long moduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "society_id", nullable = false)
    private Society society;

    @Column(name = "module_name", nullable = false, length = 50)
    private String moduleName;

    @Column(name = "is_enabled")
    private Boolean isEnabled = true;

    // Getters and setters
    // ...
} 