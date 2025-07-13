package com.example.service;

import com.example.model.Meeting;
import com.example.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findByUserId(userId);
    }

    public List<Meeting> getMeetingsByUserIdAndDate(Long userId, LocalDate date) {
        return meetingRepository.findByUserIdAndDate(userId, date);
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public Meeting updateMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
} 