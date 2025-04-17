package com.examly.springapp.controller;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.service.PdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    private final LoanApplicationRepo loanApplicationRepo;
    private final PdfService pdfService;

    public PdfController(LoanApplicationRepo loanApplicationRepo, PdfService pdfService) {
        this.loanApplicationRepo = loanApplicationRepo;
        this.pdfService = pdfService;
    }

    @GetMapping("/generate/{loanApplicationId}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId)
            .orElseThrow(() -> new RuntimeException("LoanApplication not found for ID: " + loanApplicationId));
    
        byte[] pdfBytes = pdfService.generatePdf(loanApplication);
        if (pdfBytes == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=LoanApplication_" + loanApplicationId + ".pdf");
        headers.add("Content-Type", "application/pdf");
    
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
