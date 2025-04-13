package com.examly.springapp.service;

public interface OtpService {
    String generateOtp(String email);
    boolean validateOtp(String email, String otp);
}