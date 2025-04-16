package com.examly.springapp.service;

import com.examly.springapp.model.LoanApplication;

public interface EmailService {
    void sendOtpEmail(String recipientEmail, String otp);
    void sendLoanApplicationEmail(String recipientEmail, LoanApplication loanApplication, byte[] pdfBytes);
}