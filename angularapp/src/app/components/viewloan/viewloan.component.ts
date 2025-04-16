import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;


  loans: Loan[] = [];
  searchData: string = "";
  showConfirmDialog: boolean = false;
  selectedLoanId: number | null = null;
  order : string = 'ASC';
  order2 : string = 'ASC';
  order3 : string = 'ASC';


  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.getAllLoans();
  }

  public search() {
    this.subscription1=this.loanService.getAllLoans().subscribe(data => {
      this.loans = data.filter(l => 
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  public getAllLoans() {
    this.subscription2=this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
    });
  }

  public confirmDelete(id: number) {
    this.selectedLoanId = id;
    this.showConfirmDialog = true;
  }

  public deleteLoan() {
      this.subscription3=this.loanService.deleteLoan(this.selectedLoanId).subscribe((data) => {
        this.getAllLoans();
        this.showConfirmDialog = false;
      }); 
  }

  public cancelDelete() {
    this.showConfirmDialog = false;
  }

  public sortByInterest(){
    if(this.order=='ASC'){
      this.loans.sort((i1,i2)=>i1.interestRate - i2.interestRate);
      this.order='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.interestRate - i1.interestRate);
      this.order='ASC';
    }
  }

  public sortByMaximumAmount(){
    if(this.order2=='ASC'){
      this.loans.sort((i1,i2)=>i1.maximumAmount - i2.maximumAmount);
      this.order2='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.maximumAmount - i1.maximumAmount);
      this.order2='ASC';
    }
    
  }

  public sortByTenure(){
    if(this.order3=='ASC'){
      this.loans.sort((i1,i2)=>i1.repaymentTenure - i2.repaymentTenure);
      this.order3='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.repaymentTenure - i1.repaymentTenure);
      this.order3='ASC';
    }
    
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
