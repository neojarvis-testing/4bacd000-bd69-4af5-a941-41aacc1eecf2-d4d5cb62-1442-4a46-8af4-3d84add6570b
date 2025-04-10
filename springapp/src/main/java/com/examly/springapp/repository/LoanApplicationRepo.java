package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.LoanApplication;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication,Long>{

    public List<LoanApplication> findByUser_UserId(Long userId);

}
