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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    // Validate if passwords match
    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }
  
    this.errorMessage = "";
  
    // Call authentication service to register the user
    this.authService.register(this.registerData).subscribe(
      (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  
}
