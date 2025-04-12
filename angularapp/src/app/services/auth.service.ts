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

  register(user: User): Observable<any> {
    return this.httpClient.post(AppConfig.baseUrl + 'api/register', user);
  }

  login(login: Login): Observable<any> {
    return this.httpClient.post(AppConfig.baseUrl + 'api/login', login).pipe(
        tap((response: any) => {
            if (response.token) {
                sessionStorage.setItem('jwtToken', response.token);
                console.log(response.userId);
                sessionStorage.setItem('userId', response.userId);
                if (response.role) {
                  sessionStorage.setItem('userRole', response.role);
                }
            }
        })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  logout(): void {
    sessionStorage.removeItem('jwtToken');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  verifyOtp(otpRequest: { email: string; otp: string }) {
    return this.httpClient.post(AppConfig.baseUrl + 'api/otp/verify', otpRequest, { responseType: 'text' });
  }   

  sendOtp(email: string) {
    console.log("Sending OTP request for:", email); // Debug log
    return this.httpClient.post(AppConfig.baseUrl + 'api/otp/send', email, { responseType: 'text' });
  }
}
