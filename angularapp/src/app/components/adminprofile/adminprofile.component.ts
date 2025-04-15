import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

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

  getUserProfile(userId:number){
    this.authService.getUserProfile(userId).subscribe(data=>{
      this.userProfile = data;
      console.log("Check")
      console.log(this.userProfile);
    })
  }


}

