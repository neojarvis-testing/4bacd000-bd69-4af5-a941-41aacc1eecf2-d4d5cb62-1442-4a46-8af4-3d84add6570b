package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.LoanApplication;

@Service
public interface LoanApplicationService {

    public LoanApplication addLoanApplication(LoanApplication loanApplication);
    // public List<LoanApplication> getLoanApplicationByUserId(Long userId);
    public LoanApplication getLoanApplicationById(Long loanApplicationId);
    public List<LoanApplication> getAllLoanApplications();
    public LoanApplication updateLoanApplication(Long loanApplicationId, LoanApplication updatedLoanApplication);
    public boolean deleteLoanApplication(Long loanApplicationId);




}
