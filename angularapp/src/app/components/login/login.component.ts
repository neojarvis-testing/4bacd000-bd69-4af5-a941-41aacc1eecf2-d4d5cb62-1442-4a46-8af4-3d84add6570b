import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  subscription: Subscription;


  loginData: Login = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit() {
    this.subscription=this.authService.login(this.loginData).subscribe(
      (response) => {
        console.log('Login successful', response);
        sessionStorage.setItem('jwtToken', response.token);
        sessionStorage.setItem('userRole', response.userRole);

        if (response.userRole === 'admin') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }

  public togglePasswordVisibility(fieldId: string, isVisible: boolean): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.type = isVisible ? 'text' : 'password';
    }
  }
  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  
}
