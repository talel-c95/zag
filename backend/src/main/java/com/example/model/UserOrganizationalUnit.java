package com.example.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_organizational_units")
@IdClass(UserOrganizationalUnit.PK.class)
public class UserOrganizationalUnit {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "organizational_unit_id")
    private Long organizationalUnitId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizational_unit_id", insertable = false, updatable = false)
    private OrganizationalUnit organizationalUnit;

    public static class PK implements Serializable {
        private Long userId;
        private Long organizationalUnitId;
        // equals and hashCode
    }

    // Getters and setters
    public OrganizationalUnit getOrganizationalUnit() {
        return organizationalUnit;
    }

    // ...
} 