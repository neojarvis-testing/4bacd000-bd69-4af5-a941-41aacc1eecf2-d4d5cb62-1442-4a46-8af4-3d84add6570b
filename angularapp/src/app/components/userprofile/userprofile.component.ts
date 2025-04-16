import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
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

  public getUserProfile(userId){
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
