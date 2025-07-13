package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "time_management_options")
public class TimeManagementOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_option_id")
    private Long timeOptionId;

    @Column(name = "entity_id", nullable = false)
    private Long entityId;

    @Column(name = "entity_type", nullable = false, length = 20)
    private String entityType;

    @Column(name = "option_name", nullable = false, length = 50)
    private String optionName;

    @Column(name = "option_value", nullable = false)
    private String optionValue;

    // Getters and setters
    // ...
} 