import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {

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

  search() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data.filter(l => 
        JSON.stringify(l).toLowerCase().includes(this.searchData.toLowerCase())
      );
    });
  }

  getAllLoans() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
    });
  }

  confirmDelete(id: number) {
    this.selectedLoanId = id;
    this.showConfirmDialog = true;
  }

  deleteLoan() {
      this.loanService.deleteLoan(this.selectedLoanId).subscribe((data) => {
        this.getAllLoans();
        this.showConfirmDialog = false;
      }); 
  }

  cancelDelete() {
    this.showConfirmDialog = false;
  }

  sortByInterest(){
    if(this.order=='ASC'){
      this.loans.sort((i1,i2)=>i1.interestRate - i2.interestRate);
      this.order='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.interestRate - i1.interestRate);
      this.order='ASC';
    }
  }

  sortByMaximumAmount(){
    if(this.order2=='ASC'){
      this.loans.sort((i1,i2)=>i1.maximumAmount - i2.maximumAmount);
      this.order2='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.maximumAmount - i1.maximumAmount);
      this.order2='ASC';
    }
    
  }

  sortByTenure(){
    if(this.order3=='ASC'){
      this.loans.sort((i1,i2)=>i1.repaymentTenure - i2.repaymentTenure);
      this.order3='DSC';
    }else{
      this.loans.sort((i1,i2)=>i2.repaymentTenure - i1.repaymentTenure);
      this.order3='ASC';
    }
    
  }
  
}
