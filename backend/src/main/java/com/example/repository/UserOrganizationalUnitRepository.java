package com.example.repository;

import com.example.model.UserOrganizationalUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
 
public interface UserOrganizationalUnitRepository extends JpaRepository<UserOrganizationalUnit, Long> {
    List<UserOrganizationalUnit> findByUserId(Long userId);
} 