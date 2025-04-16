package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.service.EmailService;
import com.examly.springapp.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.LoanRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;
import java.util.Base64;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService{

    @Autowired
    private EmailService emailService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private LoanApplicationRepo loanApplicationRepo;

    @Autowired
    private LoanRepo loanRepo;

    @Autowired
    private UserRepo userRepo;
    

    @Override
    public LoanApplication addLoanApplication(LoanApplication loanApplication) {

        long loanId = loanApplication.getLoan().getLoanId();
        Loan eloan = loanRepo.findById(loanId).get();
        // eloan.setApplied(true);

        long userId = loanApplication.getUser().getUserId();
        User eUser = userRepo.findById(userId).get();
        



        loanApplication.setLoan(eloan);
        loanApplication.setUser(eUser);

        


        if (loanApplication.getFile() != null) {
            String encodedFile = Base64.getEncoder().encodeToString(loanApplication.getFile().getBytes());
            loanApplication.setFile(encodedFile);
        }


        System.out.println("=============== Inside the controller ==============");
        System.out.println(loanApplication);

        byte[] pdfBytes = pdfService.generatePdf(loanApplication);
        emailService.sendLoanApplicationEmail(null, loanApplication, pdfBytes);        
        
        return loanApplicationRepo.save(loanApplication);
    }

    
    
    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
         List<LoanApplication> loanApps =  loanApplicationRepo.findByUser_UserId(userId);
         if(loanApps.isEmpty()){
            throw new EntityNotFoundException("No Loan Applications found");
         }else{
            return loanApps;
         }
         
         }
    

    @Override
    public LoanApplication getLoanApplicationById(Long loanApplicationId) {
        Optional<LoanApplication> loanApplication = loanApplicationRepo.findById(loanApplicationId);
        if (loanApplication.isEmpty()) {
            throw new EntityNotFoundException("LoanApplication with " + loanApplicationId + " not found");
        } else {
        // Decoding the image file before returning
        String decodedFile = new String(Base64.getDecoder().decode(loanApplication.get().getFile()));
        loanApplication.get().setFile(decodedFile);
        return loanApplication.get();
        }
    }

    @Override
    public List<LoanApplication> getAllLoanApplications() {
        List<LoanApplication> loanApplications = loanApplicationRepo.findAll();
        if (loanApplications.isEmpty()) {
            throw new EntityNotFoundException("No Loan Applications found");
        } else {
            // Decoding files for all applications
            for (LoanApplication application : loanApplications) {
                application.setFile(new String(Base64.getDecoder().decode(application.getFile())));
            }
            return loanApplications;
        }
    }    

    @Override
    public LoanApplication updateLoanApplication(Long loanApplicationId, LoanApplication updatedLoanApplication) {
        Optional<LoanApplication> loanApplication = loanApplicationRepo.findById(loanApplicationId);
        if (loanApplication.isEmpty()) {
            throw new EntityNotFoundException("No Loan Applications found");
        } else {
            if (updatedLoanApplication.getFile() != null) {
                String encodedFile = Base64.getEncoder().encodeToString(updatedLoanApplication.getFile().getBytes());
                updatedLoanApplication.setFile(encodedFile);
            }
            updatedLoanApplication.setLoanApplicationId(loanApplicationId);
            return loanApplicationRepo.save(updatedLoanApplication);
        }
    }
    

    @Override
    public boolean deleteLoanApplication(Long loanApplicationId) {
        if(loanApplicationRepo.existsById(loanApplicationId)){
            loanApplicationRepo.deleteById(loanApplicationId);
            return true;
        }else{
            return false;
        }
       
    }



    @Override
    public LoanApplication changeLoanApplicationStatus(Long loanApplicationId, int status) {
       LoanApplication eLoanApp = loanApplicationRepo.findById(loanApplicationId).get();
       eLoanApp.setLoanStatus(status);
       return loanApplicationRepo.save(eLoanApp);
    }
}




