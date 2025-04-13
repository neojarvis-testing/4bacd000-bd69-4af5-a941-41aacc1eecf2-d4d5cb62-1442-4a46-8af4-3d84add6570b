package com.examly.springapp.service;

public interface EmailService {
    void sendOtpEmail(String recipientEmail, String otp);
}