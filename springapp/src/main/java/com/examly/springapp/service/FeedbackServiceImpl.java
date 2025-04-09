package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

import jakarta.persistence.EntityNotFoundException;
@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired private FeedbackRepo feedbackRepo;
    List<Feedback> feedbackList = new ArrayList<>();
    
    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        Optional<Feedback> opt = feedbackRepo.findById(id);
        if(opt.isEmpty()){
            throw new EntityNotFoundException();
        }
        else{
            return opt.get();
        }
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll(); 
    }

    @Override
    public void deleteFeedback(Long id) {
        if (feedbackRepo.existsById(id)) {
            feedbackRepo.deleteById(id); 
            System.out.println("Feedback deleted successfully for ID: " + id);
        } else {
            System.out.println("Feedback with ID: " + id + " not found.");
        }
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepo.findByUserId(userId); 
    }
}

