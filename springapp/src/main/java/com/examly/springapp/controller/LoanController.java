package com.examly.springapp.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.exceptions.DuplicateLoanException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanService;


@RestController
public class LoanController {

    private LoanService loanService;

    @PostMapping("/api/loan")
    public ResponseEntity<?> addLoan(@RequestBody Loan loan) {
        try
        {
            Loan createdLoan = loanService.addLoan(loan);
            return ResponseEntity.status(201).body(createdLoan);
        }catch(DuplicateLoanException e)
        {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/api/loan/{loanId}")
    public ResponseEntity<?> viewLoanById(@PathVariable Long loanId) {

        try 
        {
            Loan loan = loanService.getLoanById(loanId);
            return ResponseEntity.status(200).body(loan);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/loan")
    public ResponseEntity<?> viewAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return ResponseEntity.status(200).body(loans);
    }

    @PutMapping("/api/loan/{loanId}")
    public ResponseEntity<?> editLoan(@PathVariable Long loanId, @RequestBody Loan updatedLoan) 
    {
        try {
            Loan loan = loanService.updateLoan(loanId, updatedLoan);
            return ResponseEntity.status(200).body(loan);
        } catch (Exception e) 
        {
            return ResponseEntity.status(404).body("Loan not found");

        }
    }

    @DeleteMapping("/api/loan/{loanId}")
    public ResponseEntity<?> deleteLoan(@PathVariable Long loanId) {
        try {
            boolean deletedLoan = loanService.deleteLoan(loanId);
            return ResponseEntity.status(200).body(deletedLoan);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Loan not found");
        }

    }

}
