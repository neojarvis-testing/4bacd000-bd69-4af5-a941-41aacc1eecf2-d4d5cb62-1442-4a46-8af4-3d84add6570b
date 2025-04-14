package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanApplicationId;
    private LocalDate submissionDate;
    private int loanStatus;
    private String farmLocation;
    private String farmerAddress;
    private double farmSizeInAcres;
    private String farmPurpose;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String file;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    @ManyToOne
    @JoinColumn(name="loanId")
    private Loan loan;

}
