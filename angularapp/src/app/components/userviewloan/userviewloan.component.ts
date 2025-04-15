import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  loans: Loan[] = [];
  loansApplied: LoanApplication[] = [];
  userId: number = null;
  searchData: string = "";
  appliedLoans: Set<number> = new Set(); //track applied loans
  constructor(private loanService: LoanService, private router: Router) { }
  checkAppliedLoan: boolean = false;

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem("userId"));

    this.getAllLoans();
    this.getAppliedLoans();

  }

  getAllLoans() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      console.log(this.loans);
    });
  }

  getAppliedLoans() {
    this.loanService.getLoanApplicationByUserId(this.userId).subscribe(data => {
      this.loansApplied = data;
      console.log(this.loansApplied);
    })
  }

  isApplied(loanId: number) {
  console.log("inside the is Applied");
  console.log(loanId);

  let arr = this.loansApplied.filter(laonApp =>  laonApp.loan.loanId == loanId)
  if(arr.length>0){
    console.log("====true=====")
    return true;
  }else{
    console.log("==============false==============")
    return false;
  }


  }

  appliedButton(loanId: number) {
    this.appliedLoans.add(loanId);
    this.checkAppliedLoan = true;
    this.router.navigate(['/loanapplicationform', loanId]);
  }

  search() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l =>
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

}
