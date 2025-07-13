package com.example.controller;

import com.example.model.Message;
import com.example.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageService.sendMessage(message);
    }

    @GetMapping
    public List<Message> getMessagesForRole(@RequestParam String role) {
        return messageService.getMessagesForRole(role);
    }
} 