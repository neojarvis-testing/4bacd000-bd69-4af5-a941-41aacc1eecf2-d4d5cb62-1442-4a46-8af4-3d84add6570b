package com.examly.springapp.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class OtpServiceImpl implements OtpService {
    private Map<String, String> otpStorage = new HashMap<>();

    @Override
    public String generateOtp(String email) {
        email = email.trim().replaceAll("\"", ""); 
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStorage.put(email, otp);
        return otp;
    }

    @Override
    public boolean validateOtp(String email, String otp) {
        email = email.trim().replaceAll("\"", ""); 
        String storedOtp = otpStorage.get(email);
        return storedOtp != null && storedOtp.equals(otp);
    }
}
