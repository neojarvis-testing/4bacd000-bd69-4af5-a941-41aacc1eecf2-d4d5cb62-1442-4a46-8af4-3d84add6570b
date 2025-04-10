import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {

  loans:Loan[]=[];

  constructor(private loanService:LoanService,private router:Router) { }

  ngOnInit(): void {
      this.getAllLoans();
  }

  getAllLoans()
  {
    this.loanService.getAllLoans().subscribe(data=>{
      this.loans=data;
    })
  }

  deleteLoan(id:number)
  {
    this.router.navigate(['/confirmDelete',id])

  }


}
