import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators'
import { AppConfig } from '../config/app-config';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.httpClient.post(AppConfig.baseUrl + 'api/register', user);
  }

  public login(login: Login): Observable<any> {
    return this.httpClient.post(AppConfig.baseUrl + 'api/login', login).pipe(
        tap((response: any) => {
            if (response.token) {
                sessionStorage.setItem('jwtToken', response.token);
                console.log(response.userId);
                sessionStorage.setItem('userId', response.userId);
                sessionStorage.setItem('userName', response.username);
                if (response.role) {
                  sessionStorage.setItem('userRole', response.role);
                }
            }
        })
    );
  }

  public getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  public getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  public logout(): void {
    sessionStorage.removeItem('jwtToken');
  }

  public getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  public verifyOtp(otpRequest: { email: string; otp: string }) {
    return this.httpClient.post(AppConfig.baseUrl + 'api/otp/verify', otpRequest, { responseType: 'text' });
  }   

  public sendOtp(email: string) {
    console.log("Sending OTP request for:", email); // Debug log
    return this.httpClient.post(AppConfig.baseUrl + 'api/otp/send', email, { responseType: 'text' });
  }

  public validateUser(user: User): Observable<any> {
    return this.httpClient.post(AppConfig.baseUrl + 'api/validateUser', user);
  }

  public getUserProfile(userId:number):Observable<any>{
    return this.httpClient.get(AppConfig.baseUrl + "/api/userProfile/"+userId);
  }


}
