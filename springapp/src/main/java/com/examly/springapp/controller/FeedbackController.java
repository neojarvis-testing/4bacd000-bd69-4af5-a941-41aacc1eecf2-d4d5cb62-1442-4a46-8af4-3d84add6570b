package com.examly.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

@RestController
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/api/feedback")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback savedFeedback = feedbackService.createFeedback(feedback);
            return ResponseEntity.status(201).body(savedFeedback);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Failed to create Feedback.");
        }

    }

    @GetMapping("/api/feedback/{id}")
    public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
        try {
            Feedback feedback = feedbackService.getFeedbackById(id);
            return ResponseEntity.status(200).body(feedback);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Feedback not found.");
        }
    }

    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAllFeedbacks() {
        try {
            List<Feedback> feedbackList = feedbackService.getAllFeedbacks();

            return ResponseEntity.status(200).body(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("An error occurred.");
        }
    }

    @DeleteMapping("/api/feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        try {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.status(200).body("Feedback deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Feedback not found.");
        }
    }

    @GetMapping("/api/feedback/user/{userId}")
    public ResponseEntity<?> getFeedbacksByUserId(@PathVariable Long userId) {
        try {
            List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId);
            return ResponseEntity.status(200).body(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("No feedbacks found for this user.");
        }
    }
}
