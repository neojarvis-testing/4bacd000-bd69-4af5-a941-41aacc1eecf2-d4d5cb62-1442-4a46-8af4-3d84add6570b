import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {


  public apiUrl="https://ide-fbbcebfdaefdbfeafbdddcbaafdaddb.premiumproject.examly.io/proxy/8080"

  constructor(private http: HttpClient) {}


  getAllLoans(): Observable<any> 
  {
    return this.http.get<any>(this.apiUrl + "/loan");
  }


  getLoanById(id: number): Observable<any>
  {
    return this.http.get<any>(this.apiUrl + "/loan/" + id);
  }


  addLoan(loan:Loan): Observable<any> 
  {
    return this.http.post<any>(this.apiUrl + "/loan", loan);
  }

 
  updateLoan(id: number, loan:Loan): Observable<any> 
  {
    return this.http.put<any>(this.apiUrl + "/loan/" + id, loan);
  }

 
  deleteLoan(loanId: number): Observable<any> 
  {
    return this.http.delete(this.apiUrl + "/loan/" + loanId);
  }

  
  getAppliedLoans(userId: number): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/loanapplication/user/" + userId);
  }

 
  deleteLoanApplication(loanId: number): Observable<any> 
  {
    return this.http.delete(this.apiUrl + "/loanapplication/" + loanId);
  }

  
  addLoanApplication(loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.post(this.apiUrl + "/loanapplication", loanApplication);
  }

 
  getAllLoanApplications(): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/loanapplication");
  }

  getLoanApplicationById(loanApplicationId:number): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/loanapplication/" +loanApplicationId);
  }
  
  updateLoanStatus(id: number, loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.put(this.apiUrl + "/loanapplication/" + id, loanApplication);
  }
  
}
 
