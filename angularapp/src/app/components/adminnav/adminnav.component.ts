import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
  showLogoutModal: boolean = false; 
  userId: number = parseInt(sessionStorage.getItem('userId'));
  username: string = sessionStorage.getItem('userName');

  constructor(private router: Router) { }

  ngOnInit(): void { }
  

  
  public logout(): void {
    this.showLogoutModal = true; 
  }

  public confirmLogout(): void {
    this.showLogoutModal = false; 
    sessionStorage.clear(); 
    this.router.navigate(['/login']); 
  }

  public cancelLogout(): void {
    this.showLogoutModal = false;
  }
}
