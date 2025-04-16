import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  subscription: Subscription;
  farmLocation: string = '';
  address: string = '';
  size: string = '';
  purpose: string = '';
  proof: string = '';
  loanId: number;
  userId: number;
  showSuccessPopup: boolean = false;
  loanApplicationForm: FormGroup;
  constructor(private fb: FormBuilder, private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loanApplicationForm = this.fb.group({
      farmLocation: ['', Validators.required],
      address: ['', Validators.required],
      size: [null, [Validators.required, Validators.min(0)]],
      purpose: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.loanId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userId = parseInt(sessionStorage.getItem("userId"));
    console.log("============ Inside loanForm  ==========================")
    console.log(this.loanId)
    console.log(this.userId)

  }

  public onSubmit(): void {
    if (this.loanApplicationForm.valid) {
      const loanApplicationData: LoanApplication = {
        user: {
          userId: this.userId,
        },
        loan: {
          loanId: this.loanId,
        },
        userId: this.userId,
        loanId: this.loanId,
        submissionDate: new Date().toISOString(),
        loanStatus: 1,
        farmLocation: this.loanApplicationForm.get('farmLocation')?.value,
        farmerAddress: this.loanApplicationForm.get('address')?.value,
        farmSizeInAcres: parseFloat(this.loanApplicationForm.get('size')?.value),
        farmPurpose: this.loanApplicationForm.get('purpose')?.value,
        file: "imgWillInsertThere" // Update based on how file handling is implemented
      };

      console.log("============ Inside onSubmit loanApplicationForm ==========================");
      console.log(this.loanApplicationForm.value);

      this.subscription=this.loanService.addLoanApplication(loanApplicationData).subscribe({
        next: (data) => {
          this.showSuccessPopup = true;
          this.loanApplicationForm.reset();
        },
        error: (err) => {
          console.error('Error while submitting the loan application:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }


  public closePopup() : void{
    this.showSuccessPopup = false;
    this.router.navigate(['/userviewloan']);
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.proof = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
