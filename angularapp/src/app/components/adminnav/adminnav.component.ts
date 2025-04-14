import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  showLogoutModal: boolean = false; // For logout confirmation modal
  userId: number = parseInt(sessionStorage.getItem('userId'));
  username: string = sessionStorage.getItem('userName');

  constructor(private router: Router) { }

  ngOnInit(): void { }
  

  // Handle Logout
  logout(): void {
    this.showLogoutModal = true; // Show confirmation modal
  }

  confirmLogout(): void {
    this.showLogoutModal = false; // Close modal
    sessionStorage.clear(); // Clear session storage
    this.router.navigate(['/login']); // Redirect to login page
  }

  cancelLogout(): void {
    this.showLogoutModal = false; // Close modal
  }
}
