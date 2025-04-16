import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-view-applied-loan-details',
  templateUrl: './view-applied-loan-details.component.html',
  styleUrls: ['./view-applied-loan-details.component.css']
})
export class ViewAppliedLoanDetailsComponent implements OnInit {
  subscription: Subscription;


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

  public getLoanApp(){
    this.subscription=this.loanService.getLoanApplicationById(this.loanAppId).subscribe(data=>{
      this.loanApplication = data;
      console.log(this.loanApplication)
    })
  }

  public backButtonForUser(){
    this.router.navigate(['/userappliedloan'])
  }

  public backButtonForAdmin(){
    this.router.navigate(['/requestedloan'])
  }

  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
