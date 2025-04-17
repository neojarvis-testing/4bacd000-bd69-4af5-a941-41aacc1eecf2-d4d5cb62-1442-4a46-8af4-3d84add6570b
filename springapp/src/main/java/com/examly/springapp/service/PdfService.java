package com.examly.springapp.service;

import com.examly.springapp.model.LoanApplication;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
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

            
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 20);
            float pageWidth = page.getMediaBox().getWidth();
            contentStream.newLineAtOffset((pageWidth - 100) / 2, 750); 
            contentStream.showText("FarmAid");
            contentStream.endText();

            
            contentStream.moveTo(100, 740); 
            contentStream.lineTo(pageWidth - 100, 740); 
            contentStream.stroke(); 

            contentStream.moveTo(100, 735); 
            contentStream.lineTo(pageWidth - 100, 735);
            contentStream.stroke(); 

            
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);
            contentStream.newLineAtOffset((pageWidth - 180) / 2, 710); 
            contentStream.showText("Loan Application Details");
            contentStream.endText();

            
            int columnWidth = 200;
            int tableWidth = columnWidth * 2; 
            float startX = (pageWidth - tableWidth) / 2; 
            int startY = 700;
            int rowHeight = 20;

            
            drawCell(contentStream, startX, startY, columnWidth, rowHeight, "Field");
            drawCell(contentStream, startX + columnWidth, startY, columnWidth, rowHeight, "Details");

            
            drawCell(contentStream, startX, startY - rowHeight, columnWidth, rowHeight, "Loan Application ID");
            drawCell(contentStream, startX + columnWidth, startY - rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getLoanApplicationId()));

            drawCell(contentStream, startX, startY - 2 * rowHeight, columnWidth, rowHeight, "Submission Date");
            drawCell(contentStream, startX + columnWidth, startY - 2 * rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getSubmissionDate()));

            drawCell(contentStream, startX, startY - 3 * rowHeight, columnWidth, rowHeight, "Loan Status");
            drawCell(contentStream, startX + columnWidth, startY - 3 * rowHeight, columnWidth, rowHeight, loanApplication.getLoanStatus() == 1 ? "Approved" : "Pending");

            drawCell(contentStream, startX, startY - 4 * rowHeight, columnWidth, rowHeight, "Farm Location");
            drawCell(contentStream, startX + columnWidth, startY - 4 * rowHeight, columnWidth, rowHeight, loanApplication.getFarmLocation());

            drawCell(contentStream, startX, startY - 5 * rowHeight, columnWidth, rowHeight, "Farm Size (Acres)");
            drawCell(contentStream, startX + columnWidth, startY - 5 * rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getFarmSizeInAcres()));

            drawCell(contentStream, startX, startY - 6 * rowHeight, columnWidth, rowHeight, "Farm Purpose");
            drawCell(contentStream, startX + columnWidth, startY - 6 * rowHeight, columnWidth, rowHeight, loanApplication.getFarmPurpose());

            if (loanApplication.getUser() != null) {
                drawCell(contentStream, startX, startY - 7 * rowHeight, columnWidth, rowHeight, "Applicant Name");
                drawCell(contentStream, startX + columnWidth, startY - 7 * rowHeight, columnWidth, rowHeight, loanApplication.getUser().getUsername());

                drawCell(contentStream, startX, startY - 8 * rowHeight, columnWidth, rowHeight, "Email");
                drawCell(contentStream, startX + columnWidth, startY - 8 * rowHeight, columnWidth, rowHeight, loanApplication.getUser().getEmail());

                drawCell(contentStream, startX, startY - 9 * rowHeight, columnWidth, rowHeight, "Mobile Number");
                drawCell(contentStream, startX + columnWidth, startY - 9 * rowHeight, columnWidth, rowHeight, loanApplication.getUser().getMobileNumber());
            }

            if (loanApplication.getLoan() != null) {
                drawCell(contentStream, startX, startY - 10 * rowHeight, columnWidth, rowHeight, "Loan Type");
                drawCell(contentStream, startX + columnWidth, startY - 10 * rowHeight, columnWidth, rowHeight, loanApplication.getLoan().getLoanType());

                drawCell(contentStream, startX, startY - 11 * rowHeight, columnWidth, rowHeight, "Interest Rate (%)");
                drawCell(contentStream, startX + columnWidth, startY - 11 * rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getLoan().getInterestRate()));

                drawCell(contentStream, startX, startY - 12 * rowHeight, columnWidth, rowHeight, "Maximum Amount (Rs)");
                drawCell(contentStream, startX + columnWidth, startY - 12 * rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getLoan().getMaximumAmount()));

                drawCell(contentStream, startX, startY - 13 * rowHeight, columnWidth, rowHeight, "Repayment Tenure (Months)");
                drawCell(contentStream, startX + columnWidth, startY - 13 * rowHeight, columnWidth, rowHeight, String.valueOf(loanApplication.getLoan().getRepaymentTenure()));

                drawCell(contentStream, startX, startY - 14 * rowHeight, columnWidth, rowHeight, "Eligibility");
                drawCell(contentStream, startX + columnWidth, startY - 14 * rowHeight, columnWidth, rowHeight, loanApplication.getLoan().getEligibility());
            }

            contentStream.close();

            document.save(outputStream);
            return outputStream.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void drawCell(PDPageContentStream contentStream, float x, float y, float width, float height, String text) throws Exception {
        
        contentStream.addRect(x, y - height, width, height);
        contentStream.stroke();

        
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA, 12);
        contentStream.newLineAtOffset(x + 5, y - height + 5);
        contentStream.showText(text);
        contentStream.endText();
    }
}
