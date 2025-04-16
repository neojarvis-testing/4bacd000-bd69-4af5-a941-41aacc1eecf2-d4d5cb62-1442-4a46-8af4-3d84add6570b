import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;



  loans: LoanApplication[] = [];

  searchData: string = "";

  constructor(private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getAppliedLoans();
  }

  public getAppliedLoans(): void {
    this.subscription1=this.loanService.getAllLoanApplications().subscribe(data => {
      this.loans = data;
      console.log(this.loans);
    });
  }

  public search() {
    this.subscription2=this.loanService.getAllLoanApplications().subscribe(data => {
      this.loans = data;
      this.loans = this.loans.filter(l =>
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  public acceptButton(loanApplicationId: number) {
    this.subscription3=this.loanService.changeStatus(loanApplicationId, 2).subscribe(data => {
        this.getAppliedLoans();
      })
  }

  public rejectButton(loanApplicationId: number) {
    this.subscription4=this.loanService.changeStatus(loanApplicationId, 0).subscribe(data => {
        this.getAppliedLoans();
      })
  }

  public viewDetails(id:number){
    this.router.navigate(['/viewAppliedLoanDetails',id]);
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
    if(this.subscription4){
      this.subscription4.unsubscribe();
    }
  }



}
