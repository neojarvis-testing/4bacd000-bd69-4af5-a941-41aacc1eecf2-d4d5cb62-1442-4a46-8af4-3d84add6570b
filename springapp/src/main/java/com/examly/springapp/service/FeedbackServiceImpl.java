package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepo feedbackRepo;
    private final UserRepo userRepo;
    private final List<Feedback> feedbackList = new ArrayList<>();

    public FeedbackServiceImpl(FeedbackRepo feedbackRepo, UserRepo userRepo) {
        this.feedbackRepo = feedbackRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        Optional<User> optionalUser = userRepo.findById(feedback.getUser().getUserId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            feedback.setUser(user); 
            return feedbackRepo.save(feedback); 
        } else {
            throw new RuntimeException("User not found with ID: " + feedback.getUser().getUserId());
        }
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
        } 
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepo.findByUser_UserId(userId); 
    }
}

