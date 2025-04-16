import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { LoanService } from 'src/app/services/loan.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-loan-status-chart',
  templateUrl: './loan-status-chart.component.html',
  styleUrls: ['./loan-status-chart.component.css']
})
export class LoanStatusChartComponent implements OnInit {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;


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
  public testApiCall() {
    this.subscription1=this.loanService.getLoanApplications().subscribe({
      next: (loans) => {
        console.log("Test API Call - Loan Data:", loans); 
      },
      error: (err) => {
        console.error("Test API Call - Error:", err);  
      }
    });
  }
  
  public fetchLoanAnalytics() {
    this.subscription2=this.loanService.getLoanApplications().subscribe(loans => {
      console.log("Fetched Loan Data:", loans); // Debugging Output
  
          this.subscription3=this.loanService.getLoanApplications().subscribe(loans => {
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
