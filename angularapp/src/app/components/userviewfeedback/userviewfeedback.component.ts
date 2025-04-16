import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  confirmDeleteId: number | null = null;
  userId:number;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId'));
    this.getFeedbacksByUserId();
  }

  public getFeedbacksByUserId(): void {
    console.log("=============Inside FeedBacks By User==============")
    console.log(this.userId);
    this.feedbackService.getFeedbacksByUserId(this.userId).subscribe((data) => {
      this.feedbackList = data;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }

  public confirmDelete(feedbackId: number): void {
    this.confirmDeleteId = feedbackId;
  }

  public deleteFeedback(): void {
    if (this.confirmDeleteId !== null) {
      this.feedbackService.deleteFeedback(this.confirmDeleteId).subscribe(
        (response) => {
          console.log('Server response:', response);
          this.feedbackList = this.feedbackList.filter(f => f.feedbackId !== this.confirmDeleteId);
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        },
        () => {
          this.confirmDeleteId = null;
        }
      );
    }
  }

  public cancelDelete(): void {
    this.confirmDeleteId = null;
  }
}
