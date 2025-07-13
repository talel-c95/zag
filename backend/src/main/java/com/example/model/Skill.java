package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private Long skillId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizational_unit_id", nullable = false)
    private OrganizationalUnit organizationalUnit;

    @Column(name = "skill_name", nullable = false, length = 50)
    private String skillName;

    @Column(name = "skill_level", length = 20)
    private String skillLevel;

    // Getters and setters
    // ...
} 