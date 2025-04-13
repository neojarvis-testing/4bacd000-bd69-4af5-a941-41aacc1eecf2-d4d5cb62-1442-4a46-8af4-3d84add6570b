import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent{

  otp: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onVerifyOtp() {
    const email = localStorage.getItem('registeredEmail'); // Get email
    const userData = localStorage.getItem('registerData'); // Get full user details
    const registerData: User = userData ? JSON.parse(userData) : null; // Parse user details
  
    if (!registerData) {
      this.errorMessage = 'User data not found. Please register again.';
      return;
    }
  
    this.authService.verifyOtp({ email, otp: this.otp }).subscribe(
      (otpResponse) => {
        this.authService.register(registerData).subscribe(
          (registerResponse) => {
            localStorage.removeItem('registerData');
            this.router.navigate(['/login']);
          },
          (error) => {
            this.errorMessage = 'Registration failed after OTP verification. Please try again.';
          }
        );
      },
      (error) => {
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }  
}
