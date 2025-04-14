import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  loans: Loan[] = [];
  searchData: string = "";
  appliedLoans: Set<number> = new Set(); //track applied loans
  constructor(private loanService: LoanService, private router: Router) {}
  checkAppliedLoan:boolean = false;

  ngOnInit(): void {
    this.getAllLoans();
  }

  search() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l => 
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  getAllLoans() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      console.log(this.loans);
    });
  }

  appliedButton(loanId: number) {
    this.appliedLoans.add(loanId); 
    this.checkAppliedLoan = true;
    this.router.navigate(['/loanapplicationform', loanId]);
  }

}
