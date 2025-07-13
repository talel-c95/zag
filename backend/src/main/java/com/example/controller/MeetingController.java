package com.example.controller;

import com.example.model.Meeting;
import com.example.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin
public class MeetingController {
    @Autowired
    private MeetingService meetingService;

    @GetMapping
    public List<Meeting> getMeetingsByUser(@RequestParam Long userId) {
        return meetingService.getMeetingsByUserId(userId);
    }

    @GetMapping("/today")
    public List<Meeting> getMeetingsByUserAndDate(@RequestParam Long userId, @RequestParam String date) {
        return meetingService.getMeetingsByUserIdAndDate(userId, LocalDate.parse(date));
    }

    @GetMapping("/{id}")
    public Optional<Meeting> getMeetingById(@PathVariable Long id) {
        return meetingService.getMeetingById(id);
    }

    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingService.createMeeting(meeting);
    }

    @PutMapping("/{id}")
    public Meeting updateMeeting(@PathVariable Long id, @RequestBody Meeting meeting) {
        meeting.setId(id);
        return meetingService.updateMeeting(meeting);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }
} 