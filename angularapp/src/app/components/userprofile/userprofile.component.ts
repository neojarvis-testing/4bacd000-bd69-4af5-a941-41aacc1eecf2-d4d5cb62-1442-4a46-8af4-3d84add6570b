import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {


  userId:number;

  userProfile:User = {
    email:"",
    username:"",
    mobileNumber:""
  }


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem("userId"));
    this.getUserProfile(this.userId);
  }

  getUserProfile(userId){
    this.authService.getUserProfile(userId).subscribe(data=>{
      this.userProfile = data;
    })
  }

}
