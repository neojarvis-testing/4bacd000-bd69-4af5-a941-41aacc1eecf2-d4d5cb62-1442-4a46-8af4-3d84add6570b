import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  farmLocation: string = '';
  address: string = '';
  size: string = '';
  purpose: string = '';
  proof: string = '';

  formSubmitted: boolean = false;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(loanApplicationForm: NgForm): void {
    if (loanApplicationForm.valid) {
      const loanApplicationData: LoanApplication = {
        loanApplicationId: undefined,
        userId: undefined,
        loanId: undefined,
        submissionDate: new Date().toISOString(),
        loanStatus: 1,
        farmLocation: this.farmLocation,
        farmerAddress: this.address,
        farmSizeInAcres: parseFloat(this.size),
        farmPurpose: this.purpose,
        file: this.proof
      };
  
      this.loanService.addLoanApplication(loanApplicationData).subscribe({
        next: (data) => {
          this.formSubmitted = true;
          alert("Successfully Added!");
          loanApplicationForm.reset();
          this.router.navigate(['/userviewloan']);
        },
        error: (err) => {
          console.error('Error while submitting the loan application:', err);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.proof = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
