import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  selectedUser: User | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
        this.feedbackList = data;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }
  viewProfile(user: User): void {
    this.selectedUser = user; 
  }

  closeProfile(): void {
    this.selectedUser = null;
  }
}