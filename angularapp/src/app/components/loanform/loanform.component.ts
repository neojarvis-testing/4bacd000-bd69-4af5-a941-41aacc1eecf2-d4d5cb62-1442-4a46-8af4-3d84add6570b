import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  loanId: number;
  userId: number;
  showSuccessPopup: boolean = false;

  constructor(private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loanId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userId = parseInt(sessionStorage.getItem("userId"));
    console.log("============ Inside loanForm  ==========================")
    console.log(this.loanId)
    console.log(this.userId)

  }

  onSubmit(loanApplicationForm: NgForm): void {
    if (loanApplicationForm.valid) {
      const loanApplicationData: LoanApplication = {
        user:{
          userId: this.userId,
        },
        loan :{
          loanId: this.loanId,
        },
        userId: this.userId,
        loanId: this.loanId,
        submissionDate: new Date().toISOString(),
        loanStatus: 1,
        farmLocation: this.farmLocation,
        farmerAddress: this.address,
        farmSizeInAcres: parseFloat(this.size),
        farmPurpose: this.purpose,
        file: "imgWillInsertThere"
      };

      console.log("============ Inside onSubmit loanApplicationForm ==========================")
      console.log(loanApplicationForm.value)


      this.loanService.addLoanApplication(loanApplicationData).subscribe({
        next: (data) => {
          this.showSuccessPopup = true;
          loanApplicationForm.reset();
        },
        error: (err) => {
          console.error('Error while submitting the loan application:', err);
        }
      });
    }
  }
  closePopup() : void{
    this.showSuccessPopup = false;
    this.router.navigate(['/userviewloan']);
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
