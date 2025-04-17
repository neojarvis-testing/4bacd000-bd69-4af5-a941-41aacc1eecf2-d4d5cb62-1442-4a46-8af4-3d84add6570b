import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  loans: Loan[] = [];
  loansApplied: LoanApplication[] = [];
  userId: number = null;
  searchData: string = "";
  appliedLoans: Set<number> = new Set(); 
  constructor(private loanService: LoanService, private router: Router) { }
  checkAppliedLoan: boolean = false;

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem("userId"));

    this.getAllLoans();
    this.getAppliedLoans();

  }

  public getAllLoans() {
    this.subscription1=this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      console.log(this.loans);
    });
  }

  public getAppliedLoans() {
    this,this.subscription2=this.loanService.getLoanApplicationByUserId(this.userId).subscribe(data => {
      this.loansApplied = data;
      console.log(this.loansApplied);
    })
  }

  public isApplied(loanId: number) {
    console.log(loanId);
    let arr = this.loansApplied.filter(laonApp =>  laonApp.loan.loanId == loanId)
    if(arr.length>0){
      return true;
    }else{
      return false;
    }

  }

  public appliedButton(loanId: number) {
    this.appliedLoans.add(loanId);
    this.checkAppliedLoan = true;
    this.router.navigate(['/loanapplicationform', loanId]);
  }

  public search() {
    this.subscription3=this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l =>
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  public ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
    if(this.subscription3){
      this.subscription3.unsubscribe();
    }
  }

}
