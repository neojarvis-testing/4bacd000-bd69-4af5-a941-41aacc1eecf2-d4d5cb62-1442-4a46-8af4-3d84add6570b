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

  baseUrl : string = "https://ide-bdbedfcefbffdbfeafbdddcbaafdaddb.premiumproject.examly.io/proxy/8080/"

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/login`, login).pipe(
        tap((response: any) => {
            if (response.token) {
                localStorage.setItem('jwtToken', response.token);
            }
        })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
