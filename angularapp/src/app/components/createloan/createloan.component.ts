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

  constructor(private fb: FormBuilder, private loanService: LoanService) { }


  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanType: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      interestRate: this.fb.control("", Validators.required),
      maximumAmount: this.fb.control("", Validators.required),
      repaymentTenure: this.fb.control("", Validators.required),
      eligibility: this.fb.control("", Validators.required),
      documentsRequired: this.fb.control("", Validators.required)
    });
  }

  createLoan() {
    if (this.loanForm.invalid) {
      this.formErrorMessage = "All fields are required";
      return;
    }else{
      this.formErrorMessage = "";
      let newLoan: Loan = this.loanForm.value;
      console.log("=========== Form Value Here ====================")
      console.log(newLoan)
  
      this.loanService.addLoan(newLoan).subscribe(() => {
        alert("Successfully Added!");
        this.loanForm.reset();
      });

  
    }



  }
}