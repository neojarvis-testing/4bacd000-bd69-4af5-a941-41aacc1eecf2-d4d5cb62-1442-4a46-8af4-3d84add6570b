import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(private loanService:LoanService,private router:Router,private activatedRoute:ActivatedRoute) { }

  id:number = 0;

  loan:Loan = {
    loanType: "",
    description: "",
    interestRate: 0,
    maximumAmount: 0,
    repaymentTenure: 0,
    eligibility: "",
    documentsRequired: ""
  }
 
  public confirmDelete(id:number){
    this.loanService.deleteLoan(id).subscribe(data =>{
      this.router.navigate(['/viewLoan'])
    })
  }
 
  public loadBus(){
    this.loanService.getLoanById(this.id).subscribe(data =>{
      this.loan = data
    })
  }
 
  public cancelDelete(){
    this.router.navigate(['/viewLoan'])
  }
 
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id']
    })    
   
  }

}
