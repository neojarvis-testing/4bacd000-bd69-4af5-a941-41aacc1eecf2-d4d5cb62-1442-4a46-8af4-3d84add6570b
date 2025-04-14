import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-confirm-delete-user-applied-loan',
  templateUrl: './confirm-delete-user-applied-loan.component.html',
  styleUrls: ['./confirm-delete-user-applied-loan.component.css']
})
export class ConfirmDeleteUserAppliedLoanComponent implements OnInit {

  id:number=0;

  constructor(private loanService: LoanService, private router: Router, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id']; 
      console.log("Loaded loan ID from route:", this.id); 
    });
  }

  confirmDelete(): void {
    console.log("Attempting to delete loan with ID:", this.id); 

    this.loanService.deleteLoanApplication(this.id).subscribe(() => {
        alert("Loan deleted successfully!");
        this.router.navigate(['/userappliedloan']); 
    });
  }

  cancelDelete(): void {
    this.router.navigate(['/userappliedloan']);
  }
}