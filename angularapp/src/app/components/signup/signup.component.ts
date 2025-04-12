import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerData: User = { username: '', email: '', mobileNumber: '', password: '', userRole: '' };
  errorMessage: string = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    localStorage.setItem('registerData', JSON.stringify(this.registerData));
  
    this.authService.sendOtp(this.registerData.email).subscribe(
      (otpResponse) => {
        localStorage.setItem('registeredEmail', this.registerData.email);
        this.router.navigate(['/otp']);
      },
      (error) => {
        this.errorMessage = 'OTP could not be sent. Please try again.';
      }
    );
  }
}
