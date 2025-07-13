package com.example.service;

import com.example.model.OrganizationalUnit;
import com.example.model.UserOrganizationalUnit;
import com.example.repository.UserOrganizationalUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrganizationalUnitService {
    @Autowired
    private UserOrganizationalUnitRepository userOrganizationalUnitRepository;

    public List<OrganizationalUnit> getOrganizationalUnitsForUser(Long userId) {
        List<UserOrganizationalUnit> userUnits = userOrganizationalUnitRepository.findByUserId(userId);
        return userUnits.stream()
                .map(UserOrganizationalUnit::getOrganizationalUnit)
                .collect(Collectors.toList());
    }
} 