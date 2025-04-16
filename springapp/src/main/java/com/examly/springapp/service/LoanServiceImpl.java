package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateLoanException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LoanServiceImpl implements LoanService 
{

    private final LoanRepo loanRepo;

    public LoanServiceImpl(LoanRepo loanRepo) {
        this.loanRepo = loanRepo;
    }

    @Override
    public Loan addLoan(Loan loan) 
    {
       Optional<Loan> existingLoan = loanRepo.findById(loan.getLoanId());
        if (existingLoan.isPresent()) {
            throw new DuplicateLoanException("Loan with ID " + loan.getLoanId() + " already exists.");
        }
        return loanRepo.save(loan);
    }

    @Override
    public Loan getLoanById(Long loanId) 
    {
        Optional<Loan> opt = loanRepo.findById(loanId);
        if (opt.isEmpty()) 
        {
            throw new EntityNotFoundException("Loan with ID " + loanId + " not found.");
        } 
        else
        {
            return opt.get();
        }
        
    }

    @Override
    public List<Loan> getAllLoans() 
    {
        return loanRepo.findAll();
    }

    @Override
    public Loan updateLoan(Long loanId, Loan updatedLoan) 
    {
        Optional<Loan> existingLoan = loanRepo.findById(loanId);

        if (existingLoan.isEmpty()) {
            throw new EntityNotFoundException();
        }

        Loan loan = existingLoan.get();
        loan.setLoanType(updatedLoan.getLoanType());
        loan.setDescription(updatedLoan.getDescription());
        loan.setInterestRate(updatedLoan.getInterestRate());
        loan.setMaximumAmount(updatedLoan.getMaximumAmount());
        loan.setRepaymentTenure(updatedLoan.getRepaymentTenure());
        loan.setEligibility(updatedLoan.getEligibility());
        loan.setDocumentsRequired(updatedLoan.getDocumentsRequired());

        return loanRepo.save(loan);

    }

    @Override
    public boolean deleteLoan(Long loanId) 
    {
        Optional<Loan> loan = loanRepo.findById(loanId);
        if (loan.isEmpty()) {
           throw new EntityNotFoundException();
        } else {
            loanRepo.deleteById(loanId);
            return true;
        }

    }

}
