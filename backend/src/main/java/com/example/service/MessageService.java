package com.example.service;

import com.example.model.Message;
import com.example.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getMessagesForRole(String role) {
        return messageRepository.findAll()
            .stream()
            .filter(msg -> msg.getRecipientRole().equalsIgnoreCase(role))
            .collect(Collectors.toList());
    }
} 