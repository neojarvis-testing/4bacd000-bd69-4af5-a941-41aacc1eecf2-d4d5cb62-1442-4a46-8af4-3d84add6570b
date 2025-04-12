package com.examly.springapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.service.EmailService;
import com.examly.springapp.service.OtpService;
import com.examly.springapp.model.OtpRequest;

@RestController
@RequestMapping("/api/otp")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody String email) {
        String otp = otpService.generateOtp(email);
        emailService.sendOtpEmail(email, otp);
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpRequest request) {
        boolean isValid = otpService.validateOtp(request.getEmail(), request.getOtp());
        return isValid ? ResponseEntity.ok("OTP verified") : ResponseEntity.status(401).body("Invalid OTP");
    }
}
