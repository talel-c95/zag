package com.example.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "fiscal_periods")
public class FiscalPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fiscal_period_id")
    private Long fiscalPeriodId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "society_id", nullable = false)
    private Society society;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "is_active")
    private Boolean isActive = true;

    // Getters and setters
    // ...
} 