import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  subscription: Subscription;

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

  public getUserProfile(userId:number){
    this.subscription=this.authService.getUserProfile(userId).subscribe(data=>{
      this.userProfile = data;
      
    })
  }

  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}

