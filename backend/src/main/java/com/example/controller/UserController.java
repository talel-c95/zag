package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.ArrayList;
import com.example.service.TaskService;
import com.example.model.Task;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, Object> profile = new HashMap<>();
            profile.put("id", user.getUserId());
            profile.put("username", user.getUsername());
            profile.put("email", user.getEmail());
            profile.put("firstname", user.getFirstname());
            profile.put("lastname", user.getLastname());
            profile.put("role", user.getRole());
            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long userId, @RequestBody Map<String, String> body) {
        logger.info("Received password update request for user ID: {}", userId);
        logger.info("Request body: {}", body);
        
        String newPassword = body.get("newPassword");
        String oldPassword = body.get("oldPassword");
        
        logger.info("Extracted oldPassword: {}", oldPassword != null ? "present" : "null");
        logger.info("Extracted newPassword: {}", newPassword != null ? "present" : "null");
        
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!userService.checkPassword(user, oldPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Old password incorrect");
                return ResponseEntity.status(403).body(error);
            }
            userService.updatePassword(user, newPassword);
            Map<String, String> result = new HashMap<>();
            result.put("message", "Password updated successfully");
            return ResponseEntity.ok(result);
        }
        Map<String, String> notFound = new HashMap<>();
        notFound.put("error", "User not found");
        return ResponseEntity.status(404).body(notFound);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (User user : users) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getUserId());
            userMap.put("username", user.getUsername());
            userMap.put("firstname", user.getFirstname());
            userMap.put("lastname", user.getLastname());
            userMap.put("role", user.getRole());
            result.add(userMap);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/with-tasks")
    public ResponseEntity<?> getAllUsersWithTasks() {
        List<User> users = userService.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (User user : users) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getUserId());
            userMap.put("firstname", user.getFirstname());
            userMap.put("lastname", user.getLastname());
            userMap.put("role", user.getRole());
            List<Task> tasks = taskService.getTasksByUserId(user.getUserId());
            List<Map<String, Object>> taskList = new ArrayList<>();
            for (Task task : tasks) {
                Map<String, Object> taskMap = new HashMap<>();
                taskMap.put("id", task.getId());
                taskMap.put("title", task.getTitle());
                taskMap.put("completed", task.isCompleted());
                taskList.add(taskMap);
            }
            userMap.put("tasks", taskList);
            result.add(userMap);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/hr-summary")
    public ResponseEntity<?> getHrSummary() {
        Map<String, Object> summary = new HashMap<>();
        // TODO: Replace with real queries
        // Example: summary.put("establishmentsCount", establishmentService.count());
        // Example: summary.put("orgUnitsUpdatedToday", organizationalUnitService.countUpdatedToday());
        // Example: summary.put("pendingHRActions", taskService.countPendingHRActions());
        summary.put("establishmentsCount", 5); // Dummy value
        summary.put("orgUnitsUpdatedToday", 3); // Dummy value
        summary.put("pendingHRActions", 2); // Dummy value
        return ResponseEntity.ok(summary);
    }
} 