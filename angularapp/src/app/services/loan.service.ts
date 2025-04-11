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
    return this.http.get<any>(this.apiUrl + "/api/loan");
  }


  getLoanById(id: number): Observable<any>
  {
    return this.http.get<any>(this.apiUrl + "/api/loan/" + id);
  }


  addLoan(loan:Loan): Observable<any> 
  {
    console.log("=========== Form Value From Service ====================")
    console.log(loan)
    return this.http.post<any>(this.apiUrl + "/api/loan", loan);
  }

 
  updateLoan(id: number, loan:Loan): Observable<any> 
  {
    return this.http.put<any>(this.apiUrl + "/api/loan/" + id, loan);
  }

 
  deleteLoan(loanId: number): Observable<any> 
  {
    return this.http.delete(this.apiUrl + "/api/loan/" + loanId);
  }

  
  getAppliedLoans(userId: number): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/api/loanapplication/user/" + userId);
  }

 
  deleteLoanApplication(loanId: number): Observable<any> 
  {
    return this.http.delete(this.apiUrl + "/api/loanapplication/" + loanId);
  }

  
  addLoanApplication(loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.post(this.apiUrl + "/api/loanapplication", loanApplication);
  }

 
  getAllLoanApplications(): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/api/loanapplication");
  }

  getLoanApplicationById(loanApplicationId:number): Observable<any> 
  {
    return this.http.get(this.apiUrl + "/api/loanapplication/" +loanApplicationId);
  }
  
  updateLoanStatus(id: number, loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.put(this.apiUrl + "/api/loanapplication/" + id, loanApplication);
  }
  
}
 
