package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.service.LoanApplicationService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @PostMapping("/api/loanapplication")
    public ResponseEntity<?> addLoanApplication(@RequestBody LoanApplication loanApplication) {
        LoanApplication loanApp = loanApplicationService.addLoanApplication(loanApplication);
        return ResponseEntity.status(201).body(loanApp);
    }

    @GetMapping("/api/loanapplication/user/{userId}")
    public ResponseEntity<?> getLoanApplicationsByUserId(@PathVariable Long userId){
        try{
            List<LoanApplication> loanApps = loanApplicationService.getLoanApplicationByUserId(userId);
            return ResponseEntity.status(200).body(loanApps);
        }catch(EntityNotFoundException e){
            return ResponseEntity.status(404).body(e.getMessage());
        } 
    }

    @GetMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<?> getLoanApplicationById(@PathVariable Long loanApplicationId) {
        try {
            LoanApplication loanApp = loanApplicationService.getLoanApplicationById(loanApplicationId);
            return ResponseEntity.status(200).body(loanApp);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/api/loanapplication")
    public ResponseEntity<?> getAllLoanApplications() {
        try {
            List<LoanApplication> loanApplications = loanApplicationService.getAllLoanApplications();
            return ResponseEntity.status(200).body(loanApplications);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("/api/loanapplication/{loanapplicationid}")
    public ResponseEntity<?> updateLoanApplication(@PathVariable Long loanapplicationid,
            @RequestBody LoanApplication loanApplication) {
        try {
            LoanApplication loanApplication2 = loanApplicationService.updateLoanApplication(loanapplicationid,
                    loanApplication);
            return ResponseEntity.status(200).body(loanApplication2);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }

    }

    @PutMapping("api/loanapplication/loan/{loanId}/status/{status}")
    public ResponseEntity<?> changeLoanApplicationStatus(@PathVariable Long loanId, @PathVariable int status){
        LoanApplication loanStatusChange = loanApplicationService.changeLoanApplicationStatus(loanId,status);
        return ResponseEntity.status(200).body(loanStatusChange);
    }

    @DeleteMapping("/api/loanapplication/{loanapplicationid}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable Long loanapplicationid) {
        try {
            loanApplicationService.deleteLoanApplication(loanapplicationid);
            return ResponseEntity.status(200).body(true);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(false);
        }

    }

}
