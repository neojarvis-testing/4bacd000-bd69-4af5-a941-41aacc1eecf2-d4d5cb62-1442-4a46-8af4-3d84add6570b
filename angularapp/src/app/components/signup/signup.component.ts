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
  registerData = {
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    userRole: ''
  };

  confirmPassword: string = '';  
  errorMessage: string = '';
  fieldErrors: { [key: string]: string } = {}; 


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.fieldErrors = {};
    this.errorMessage = '';
  
    this.authService.validateUser(this.registerData).subscribe(
      (validationResponse) => {
        localStorage.setItem('registerData', JSON.stringify(this.registerData));
  
        this.authService.sendOtp(this.registerData.email).subscribe(
          (otpResponse) => {
            localStorage.setItem('registeredEmail', this.registerData.email);
            this.router.navigate(['/otp']);
          },
          (otpError) => {
            this.errorMessage = 'OTP could not be sent. Please try again.';
          }
        );
      },
      (validationError) => {
        if (validationError.error) {
          this.fieldErrors = validationError.error;
        } else {
          this.errorMessage = 'Validation failed. Please check your input.';
        }
      }
    );
  }

  validateField(field: string) {
    const fieldData = { [field]: this.registerData[field] };
    this.authService.validateUser(fieldData).subscribe(
      (response) => {
        if (this.fieldErrors[field]) {
          delete this.fieldErrors[field];
        }
      },
      (error) => {
        if (error.error && error.error[field]) {
          this.fieldErrors[field] = error.error[field];
        }
      }
    );
  }


  isFormValid(): boolean {
    const { username, email, mobileNumber, password, userRole } = this.registerData;
    const isComplete = username && email && mobileNumber && password && userRole;
    const hasErrors = Object.keys(this.fieldErrors).length > 0;
    return isComplete && !hasErrors;
  }

  
}
