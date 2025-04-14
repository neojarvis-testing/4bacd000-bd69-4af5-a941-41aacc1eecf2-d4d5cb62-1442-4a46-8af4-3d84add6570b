import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('confirmModal') confirmModal : any;

  constructor(private fb: FormBuilder, private loanService: LoanService,private router:Router,private activatedRoute:ActivatedRoute) {
    this.loanForm = this.fb.group({
      loanId: fb.control(""), 
      loanType: fb.control("", Validators.required), 
      description: fb.control("", Validators.required), 
      interestRate: fb.control("", [Validators.required,Validators.min(1)]), 
      maximumAmount: fb.control("",[Validators.required,Validators.min(1)]), 
      repaymentTenure: fb.control("", [Validators.required,Validators.min(1)]), 
      eligibility: fb.control("", Validators.required), 
      documentsRequired:fb.control ("", Validators.required) 
    });
  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    if (this.id){
      this.loanService.getLoanById(this.id).subscribe(data=>{
        this.loanForm.setValue(data);
      });
    }
    console.log("====================Admin Edit Loan========================");
    console.log(this.id);
    console.log(this.loanForm.value);
   
  }

  showConfirmation(){
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  onCancel(){
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  onConfirm(){
    this.onCancel();
    this.loanService.updateLoan(this.id, this.loanForm.value).subscribe(() => {
        this.router.navigate(["/viewLoan"]);
    });
  }

  updateLoan()
  {
    if (this.loanForm.invalid) {
      alert("Please fill in all required fields!");
      return;
    }
    this.showConfirmation();
  }
}
