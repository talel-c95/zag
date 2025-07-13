package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "banking_information")
public class BankingInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banking_id")
    private Long bankingId;

    @Column(name = "entity_id", nullable = false)
    private Long entityId;

    @Column(name = "entity_type", nullable = false, length = 20)
    private String entityType;

    @Column(name = "iban", nullable = false, length = 34)
    private String iban;

    @Column(name = "bank_name", length = 100)
    private String bankName;

    @Column(name = "bank_address")
    private String bankAddress;

    // Getters and setters
    // ...
} 