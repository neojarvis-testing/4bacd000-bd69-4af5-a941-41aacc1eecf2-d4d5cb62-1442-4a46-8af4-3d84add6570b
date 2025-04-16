import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  subscription: Subscription;
  feedbackList: Feedback[] = [];
  selectedUser: User | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  public getFeedbacks(): void {
    this.subscription=this.feedbackService.getFeedbacks().subscribe((data) => {
        this.feedbackList = data;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }
  public viewProfile(user: User): void {
    this.selectedUser = user; 
  }

  public closeProfile(): void {
    this.selectedUser = null;
  }

  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}