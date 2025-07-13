package com.example.repository;

import com.example.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByUserIdAndDate(Long userId, LocalDate date);
    List<Meeting> findByUserId(Long userId);
} 