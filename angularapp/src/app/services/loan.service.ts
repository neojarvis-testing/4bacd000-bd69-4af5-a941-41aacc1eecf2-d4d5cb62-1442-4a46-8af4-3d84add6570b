import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app-config';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) {}


  getAllLoans(): Observable<any> 
  {
    return this.http.get<any>(AppConfig.baseUrl + "api/loan");
  }


  getLoanById(id: number): Observable<any>
  {
    return this.http.get<any>(AppConfig.baseUrl + "api/loan/" + id);
  }


  addLoan(loan:Loan): Observable<any> 
  {
    console.log("=========== Form Value From Service ====================")
    console.log(loan)
    return this.http.post<any>(AppConfig.baseUrl + "api/loan", loan);
  }

 
  updateLoan(id: number, loan:Loan): Observable<any> 
  {
    return this.http.put<any>(AppConfig.baseUrl + "api/loan/" + id, loan);
  }

 
  deleteLoan(loanId: number): Observable<any> 
  {
    return this.http.delete(AppConfig.baseUrl + "api/loan/" + loanId);
  }

  
  getAppliedLoans(userId: number): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/user/" + userId);
  }

 
  deleteLoanApplication(loanId: number): Observable<any> 
  {
    return this.http.delete(AppConfig.baseUrl + "api/loanapplication/" + loanId);
  }

  
  addLoanApplication(loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.post(AppConfig.baseUrl + "api/loanapplication", loanApplication);
  }

 
  getAllLoanApplications(): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication");
  }

  getLoanApplicationById(loanApplicationId:number): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/" +loanApplicationId);
  }

  getLoanApplicationByUserId(userId:number):Observable<any>{
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/user/" +userId);
  }
  
  updateLoanStatus(id: number, loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.put(AppConfig.baseUrl + "api/loanapplication/" + id, loanApplication);
  }

  changeStatus(loanId:number, status:number):Observable<any>{
    return this.http.put(AppConfig.baseUrl + "api/loanapplication/loan/" +loanId+"/status/"+status,"");
  }

  getLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(AppConfig.baseUrl + "api/loanapplication"); // ✅ Corrected Endpoint
  }

  downloadLoanApplicationPdf(loanApplicationId: number): Observable<Blob> {
    return this.http.get(AppConfig.baseUrl + `/pdf/generate/${loanApplicationId}`, { responseType: 'blob' });
  }
}
 
