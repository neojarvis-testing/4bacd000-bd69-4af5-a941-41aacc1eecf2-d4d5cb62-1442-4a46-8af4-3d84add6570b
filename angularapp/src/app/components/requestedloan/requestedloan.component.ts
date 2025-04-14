import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {

  loans: LoanApplication[] = [];

  searchData: string = "";

  constructor(private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) { }
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
    this.loanService.getAllLoanApplications().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l =>
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  acceptButton(loanApplicationId: number) {
    this.loanService.changeStatus(loanApplicationId, 2).subscribe(data => {
        this.getAppliedLoans();
      })
  }

  rejectButton(loanApplicationId: number) {
    this.loanService.changeStatus(loanApplicationId, 0).subscribe(data => {
        this.getAppliedLoans();
      })
  }

  viewDetails(id:number){
    this.router.navigate(['/viewAppliedLoanDetails',id]);
  }



}
