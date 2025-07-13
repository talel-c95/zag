package com.example.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "payroll_elements")
public class PayrollElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payroll_element_id")
    private Long payrollElementId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizational_unit_id", nullable = false)
    private OrganizationalUnit organizationalUnit;

    @Column(name = "element_name", nullable = false, length = 50)
    private String elementName;

    @Column(name = "element_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal elementValue;

    @Column(name = "element_type", nullable = false, length = 20)
    private String elementType;

    // Getters and setters
    // ...
} 