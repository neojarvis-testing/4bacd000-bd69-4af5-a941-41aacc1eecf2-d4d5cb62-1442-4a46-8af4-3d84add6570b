import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators'
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = "https://ide-aefabcebeefdbfeafbdddcbaafdaddb.premiumproject.examly.io/proxy/8080/";

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/login`, login).pipe(
        tap((response: any) => {
            if (response.token) {
                localStorage.setItem('jwtToken', response.token);
                console.log(response.userId);
                localStorage.setItem('userId', response.userId);
            }
        })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
