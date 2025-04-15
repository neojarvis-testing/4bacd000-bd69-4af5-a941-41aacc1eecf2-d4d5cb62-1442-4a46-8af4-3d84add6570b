import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: Login = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
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

  togglePasswordVisibility(fieldId: string, isVisible: boolean): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.type = isVisible ? 'text' : 'password';
    }
  }
  
}
