import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent{
  subscription1: Subscription;
  subscription2: Subscription;


  otp: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public onVerifyOtp() {
    const email = localStorage.getItem('registeredEmail'); 
    const userData = localStorage.getItem('registerData'); 
    const registerData: User = userData ? JSON.parse(userData) : null;
  
    if (!registerData) {
      this.errorMessage = 'User data not found. Please register again.';
      return;
    }
  
    this.subscription1=this.authService.verifyOtp({ email, otp: this.otp }).subscribe(
      (otpResponse) => {
        this.subscription2=this.authService.register(registerData).subscribe(
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
  
  public ngOnDestroy(){
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }
}
