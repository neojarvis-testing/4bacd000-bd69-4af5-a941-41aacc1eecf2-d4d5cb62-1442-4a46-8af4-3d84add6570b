import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan-status-chart',
  templateUrl: './loan-status-chart.component.html',
  styleUrls: ['./loan-status-chart.component.css']
})
export class LoanStatusChartComponent implements OnInit {

  totalLoans = 0;
  pendingLoans = 0;
  approvedLoans = 0;
  rejectedLoans = 0;
  showLoanAnalytics = false;
  
  pieChartData: ChartData = {
    labels: ['Pending', 'Accepted', 'Rejected'],
    datasets: [{
      data: [0, 0, 0],  
      backgroundColor: ['orange', 'green', 'red']
    }]
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    cutoutPercentage: 0,  
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.fetchLoanAnalytics();
  }
  testApiCall() {
    this.loanService.getLoanApplications().subscribe({
      next: (loans) => {
        console.log("Test API Call - Loan Data:", loans); 
      },
      error: (err) => {
        console.error("Test API Call - Error:", err);  
      }
    });
  }
  
  fetchLoanAnalytics() {
    this.loanService.getLoanApplications().subscribe(loans => {
      console.log("Fetched Loan Data:", loans); // Debugging Output
  
          this.loanService.getLoanApplications().subscribe(loans => {
            this.totalLoans = loans.length;
            this.pendingLoans = loans.filter(loan => loan.loanStatus === 1).length;
            this.approvedLoans = loans.filter(loan => loan.loanStatus === 2).length;
            this.rejectedLoans = loans.filter(loan => loan.loanStatus === 0).length;

            this.pieChartData.datasets[0].data = [this.pendingLoans, this.approvedLoans, this.rejectedLoans];
          }); 
  
      setTimeout(() => {
        this.pieChartData = { ...this.pieChartData };
      }, 0); //  Refresh Chart Data
    });
  }
  
}
