import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  subscription5: Subscription;



  loans: LoanApplication[] = [];
  userId: number;
  searchData: string = "";

  confirmDeleteId: number | null = null;

  filter: string = "All";
  filteredLoans: LoanApplication[] = [];
  selectedStatus: string = '';


  constructor(private loanService: LoanService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem("userId"));

    this.getAppliedLoans();


  }

  public getAppliedLoans(): void {
    this.subscription1=this.loanService.getLoanApplicationByUserId(this.userId).subscribe(data => {
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

  public viewDetails(id: number) {
    this.router.navigate(['/viewAppliedLoanDetails', id]);
  }

  public sendFeedback() {
    this.router.navigate(['/useraddfeedback']);
  }


  public confirmDelete(loanApplicationId: number): void {
    this.confirmDeleteId = loanApplicationId;
  }

  public deleteLoan() {
    if (this.confirmDeleteId !== null) {
      this.subscription3=this.loanService.deleteLoanApplication(this.confirmDeleteId).subscribe(data => {
        this.getAppliedLoans();
        this.confirmDeleteId = null;
      })
    }
  }

  public cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  public filterLoans() {

    if(this.selectedStatus){
      this.subscription4=this.loanService.getLoanApplicationByUserId(this.userId).subscribe(data => {
        this.loans = data;
        this.loans = this.loans.filter(loan => loan.loanStatus == parseInt(this.selectedStatus));
      });
    }else{
      this.subscription5=this.loanService.getLoanApplicationByUserId(this.userId).subscribe(data=>{
        this.loans = data;
      })
    }


  };

  public ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
    if(this.subscription3){
      this.subscription2.unsubscribe();
    }
    if(this.subscription4){
      this.subscription2.unsubscribe();
    }
    if(this.subscription5){
      this.subscription2.unsubscribe();
    }

  }

}











