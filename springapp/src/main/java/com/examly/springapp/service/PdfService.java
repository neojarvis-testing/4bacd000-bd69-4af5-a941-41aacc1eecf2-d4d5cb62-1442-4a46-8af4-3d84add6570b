package com.examly.springapp.service;

import com.examly.springapp.model.LoanApplication;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generatePdf(LoanApplication loanApplication) {
        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);

            contentStream.beginText();
            contentStream.newLineAtOffset(50, 750);
            contentStream.showText("Loan Application Summary");
            contentStream.endText();

            contentStream.setFont(PDType1Font.HELVETICA, 12);
            int yPosition = 710;

            contentStream.beginText();
            contentStream.newLineAtOffset(50, yPosition);
            contentStream.showText("Loan Application ID: " + loanApplication.getLoanApplicationId());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Submission Date: " + loanApplication.getSubmissionDate());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Loan Status: " + (loanApplication.getLoanStatus() == 1 ? "Approved" : "Pending"));
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Farm Location: " + loanApplication.getFarmLocation());
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Farm Size: " + loanApplication.getFarmSizeInAcres() + " acres");
            contentStream.newLineAtOffset(0, -20);
            contentStream.showText("Farm Purpose: " + loanApplication.getFarmPurpose());

            if (loanApplication.getUser() != null) {
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Applicant Name: " + loanApplication.getUser().getUsername());
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Email: " + loanApplication.getUser().getEmail());
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Mobile Number: " + loanApplication.getUser().getMobileNumber());
            }

            if (loanApplication.getLoan() != null) {
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Loan Type: " + loanApplication.getLoan().getLoanType());
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Interest Rate: " + loanApplication.getLoan().getInterestRate() + "%");
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Maximum Amount: Rs " + loanApplication.getLoan().getMaximumAmount());
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Repayment Tenure: " + loanApplication.getLoan().getRepaymentTenure() + " months");
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Eligibility: " + loanApplication.getLoan().getEligibility());
            }

            contentStream.endText();
            contentStream.close();

            document.save(outputStream);
            return outputStream.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
