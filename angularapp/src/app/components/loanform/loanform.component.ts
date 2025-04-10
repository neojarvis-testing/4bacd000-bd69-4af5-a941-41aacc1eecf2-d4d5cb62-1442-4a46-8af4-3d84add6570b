import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {

  constructor(private loanService:LoanService) { }

  ngOnInit(): void {
  }

  onSubmit(loanApplicationForm:NgForm){
    if(loanApplicationForm.valid){
      this.loanService.addLoanApplication(loanApplicationForm.value).subscribe(data=>{
        
      })
      
      
    }
  }

}
