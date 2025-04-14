import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  showLogoutModal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  logout(): void {
    this.showLogoutModal = true;
  }
  confirmLogout(): void {
    this.showLogoutModal = false;
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}





