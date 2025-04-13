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
  
}
