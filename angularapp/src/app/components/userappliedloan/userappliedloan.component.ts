import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  loans: LoanApplication[] = [];
  searchData:string="";

  constructor(private loanService: LoanService, private router:Router) {}

  ngOnInit(): void {
    this.getAppliedLoans();
  }

  getAppliedLoans(): void {
    this.loanService.getAllLoanApplications().subscribe(data => {
      this.loans = data;
      console.log(this.loans);
    });
  }

  search() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l => 
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  viewDetails(id:number){
    this.router.navigate(['/viewAppliedLoanDetails',id]);
  }

  deleteLoan(id:number){
    this.router.navigate(['/confirmDeleteLoan',id]);
  }

}
