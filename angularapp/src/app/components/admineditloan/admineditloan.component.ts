import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {

  loanForm: FormGroup;
  id:number=0;

  constructor(private fb: FormBuilder, private loanService: LoanService,private router:Router,private activatedRoute:ActivatedRoute) {
    this.loanForm = this.fb.group({
      loanType: fb.control("", Validators.required), 
      description: fb.control("", Validators.required), 
      interestRate: fb.control("", Validators.required), 
      maxAmount: fb.control("", Validators.required), 
      tenure: fb.control("", Validators.required), 
      eligibility: fb.control("", Validators.required), 
      documentsRequired:fb.control ("", Validators.required) 
    });
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if (this.id) {
      this.loanService.getLoanById(this.id).subscribe({
        next: (loan) => this.loanForm.patchValue(loan),
        error: (err) => console.error("Error fetching loan:", err),
      });
    }
  }


  updateLoan()
  {
    if (this.loanForm.invalid) {
      alert("Please fill in all required fields!");
      return;
    }

    this.loanService.updateLoan(this.id, this.loanForm.value).subscribe({
      next: () => {
        alert("Updated successfully");
        this.router.navigate(["/view-loan"]);
      },
    });
  }

}
