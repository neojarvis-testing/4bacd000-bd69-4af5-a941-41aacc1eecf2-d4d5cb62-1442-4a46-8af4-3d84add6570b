import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  subscription1: Subscription;
  subscription2: Subscription;

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

  public validateField(field: string) {
    const value = field === 'confirmPassword' ? this.confirmPassword : this.registerData[field];

    // Required field validation
    if (!value) {
      this.fieldErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      return;
    }

    // Email validation: Proper format check
    if (field === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      this.fieldErrors[field] = 'Invalid email format. Please enter a valid email.';
      return;
    }

    // Mobile number validation: Only digits (0-9) and exactly 10 digits
    if (field === 'mobileNumber' && !/^\d{10}$/.test(value)) {
      this.fieldErrors[field] = 'Mobile number must contain only digits and be exactly 10 digits long.';
      return;
    }

    // Password confirmation validation
    if (field === 'confirmPassword') {
      if (!this.confirmPassword) {
        this.fieldErrors[field] = 'Confirm Password is required.';
      } else if (this.confirmPassword !== this.registerData.password) {
        this.fieldErrors[field] = 'Passwords do not match.';
      } else {
        delete this.fieldErrors[field]; // ✅ Remove error when passwords match
      }
      return;
    }

    // Remove error message if validation passes
    delete this.fieldErrors[field];
  }

  public onSubmit() {
    this.fieldErrors = {};
    this.errorMessage = '';

    
    Object.keys(this.registerData).forEach((field) => this.validateField(field));
    this.validateField('confirmPassword');

    if (Object.keys(this.fieldErrors).length > 0) {
      return;
    }

    this.subscription1=this.authService.validateUser(this.registerData).subscribe(
      (validationResponse) => {
        localStorage.setItem('registerData', JSON.stringify(this.registerData));

        this.subscription2=this.authService.sendOtp(this.registerData.email).subscribe(
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

  public isFormValid(): boolean {
    return Object.keys(this.fieldErrors).length === 0 && Object.values(this.registerData).every(value => value);
  }

  public togglePasswordVisibility(fieldId: string, isVisible: boolean): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.type = isVisible ? 'text' : 'password';
    }
  }

  public ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }
  



}
