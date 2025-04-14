import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-view-applied-loan-details',
  templateUrl: './view-applied-loan-details.component.html',
  styleUrls: ['./view-applied-loan-details.component.css']
})
export class ViewAppliedLoanDetailsComponent implements OnInit {


  loanApplication:LoanApplication ={
   loan:{},
    submissionDate: "",
    loanStatus: 0,
    farmLocation: "",
    farmerAddress: "",
    farmSizeInAcres: 0,
    farmPurpose: "",
    file: ""
  
  } ;

  loanAppId:number;
  role:string ="";


  constructor(private loanService :LoanService, private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loanAppId = parseInt(this.activateRoute.snapshot.paramMap.get("id"));
    this.getLoanApp();
    this.role = sessionStorage.getItem("userRole");
    console.log(this.role)
    
  }

  getLoanApp(){
    this.loanService.getLoanApplicationById(this.loanAppId).subscribe(data=>{
      this.loanApplication = data;
      console.log(this.loanApplication)
    })
  }

  backButtonForUser(){
    this.router.navigate(['/userappliedloan'])
  }

  backButtonForAdmin(){
    this.router.navigate(['/requestedloan'])
  }

}
