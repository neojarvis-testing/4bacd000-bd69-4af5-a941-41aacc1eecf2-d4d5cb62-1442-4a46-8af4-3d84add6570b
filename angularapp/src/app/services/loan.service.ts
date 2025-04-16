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


  public getAllLoans(): Observable<any> 
  {
    return this.http.get<any>(AppConfig.baseUrl + "api/loan");
  }


  public getLoanById(id: number): Observable<any>
  {
    return this.http.get<any>(AppConfig.baseUrl + "api/loan/" + id);
  }


  public addLoan(loan:Loan): Observable<any> 
  {
    console.log("=========== Form Value From Service ====================")
    console.log(loan)
    return this.http.post<any>(AppConfig.baseUrl + "api/loan", loan);
  }

 
  public updateLoan(id: number, loan:Loan): Observable<any> 
  {
    return this.http.put<any>(AppConfig.baseUrl + "api/loan/" + id, loan);
  }

 
  public deleteLoan(loanId: number): Observable<any> 
  {
    return this.http.delete(AppConfig.baseUrl + "api/loan/" + loanId);
  }

  
  public getAppliedLoans(userId: number): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/user/" + userId);
  }

 
  public deleteLoanApplication(loanId: number): Observable<any> 
  {
    return this.http.delete(AppConfig.baseUrl + "api/loanapplication/" + loanId);
  }

  
  public addLoanApplication(loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.post(AppConfig.baseUrl + "api/loanapplication", loanApplication);
  }

 
  public getAllLoanApplications(): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication");
  }

  public getLoanApplicationById(loanApplicationId:number): Observable<any> 
  {
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/" +loanApplicationId);
  }

  public getLoanApplicationByUserId(userId:number):Observable<any>{
    return this.http.get(AppConfig.baseUrl + "api/loanapplication/user/" +userId);
  }
  
  public updateLoanStatus(id: number, loanApplication:LoanApplication): Observable<any> 
  {
    return this.http.put(AppConfig.baseUrl + "api/loanapplication/" + id, loanApplication);
  }

  public changeStatus(loanId:number, status:number):Observable<any>{
    return this.http.put(AppConfig.baseUrl + "api/loanapplication/loan/" +loanId+"/status/"+status,"");
  }

  public getLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(AppConfig.baseUrl + "api/loanapplication"); // ✅ Corrected Endpoint
  }

  downloadLoanApplicationPdf(loanApplicationId: number): Observable<Blob> {
    return this.http.get(AppConfig.baseUrl + `/pdf/generate/${loanApplicationId}`, { responseType: 'blob' });
  }
}
 
