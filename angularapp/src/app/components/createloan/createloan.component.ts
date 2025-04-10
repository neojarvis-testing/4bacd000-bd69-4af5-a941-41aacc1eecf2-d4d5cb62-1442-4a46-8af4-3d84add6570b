import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  loanForm: FormGroup;
  formErrorMessage: string = "";

  constructor(private fb: FormBuilder, private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanType: ["", Validators.required], 
      description: ["", Validators.required], 
      interestRate: ["", Validators.required], 
      maximumAmount: ["", Validators.required], 
      repaymentTenure: ["", Validators.required], 
      eligibility: ["", Validators.required], 
      documentsRequired: ["", Validators.required]
    });
  }

  createLoan() {
    if (this.loanForm.invalid) {
      this.formErrorMessage = "All fields are required";
      return;
    }

    this.formErrorMessage = ""; 
    const newLoan: Loan = this.loanForm.value;

    this.loanService.addLoan(newLoan).subscribe(() => {
      alert("Successfully Added!");
      this.loanForm.reset();
    });
  }
}