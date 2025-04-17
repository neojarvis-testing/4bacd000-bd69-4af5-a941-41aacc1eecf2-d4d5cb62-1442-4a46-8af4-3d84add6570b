package com.examly.springapp.service;

import com.examly.springapp.model.LoanApplication;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.nio.file.Files;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${admin.email}")
    private String adminEmail;

    @Override
    public void sendOtpEmail(String recipientEmail, String otp) {
        recipientEmail = recipientEmail.trim();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public void sendLoanApplicationEmail(String recipientEmail, LoanApplication loanApplication, byte[] pdfBytes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(adminEmail);
            helper.setSubject("New Loan Application Submitted");

            String emailBody = String.format(
                "Dear Admin,\n\nA new loan application has been submitted.\n" +
                "Please find the attached PDF for full details."
            );

            helper.setText(emailBody);

            File tempFile = File.createTempFile("LoanApplicationDetails_", ".pdf");
            Files.write(tempFile.toPath(), pdfBytes);
            helper.addAttachment("LoanApplicationDetails.pdf", tempFile);

            mailSender.send(message);

            tempFile.deleteOnExit();
        } catch (Exception e) {
            System.err.println("Failed to send email with PDF: " + e.getMessage());
        }
    }
}