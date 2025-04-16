package com.examly.springapp.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Loan implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loanId; 
    private String loanType;
    private String description;
    private double interestRate;
    private double maximumAmount;
    private int repaymentTenure;
    private String eligibility;
    private String documentsRequired;

    private boolean isApplied;

}
