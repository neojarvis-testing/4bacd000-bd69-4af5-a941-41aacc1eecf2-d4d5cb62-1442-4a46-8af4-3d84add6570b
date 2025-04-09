package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Loan;

public interface LoanService 
{
    public Loan addLoan(Loan loan); 
    public Loan getLoanById(Long loanId); 
    public List<Loan> getAllLoans(); 
    public Loan updateLoan(Long loanId, Loan updatedLoan); 
    public boolean deleteLoan(Long loanId); 
}
