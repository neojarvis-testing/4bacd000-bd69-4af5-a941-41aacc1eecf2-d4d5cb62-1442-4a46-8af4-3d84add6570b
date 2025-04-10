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

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacksByUserId();
  }

  getFeedbacksByUserId(): void {
    this.feedbackService.getFeedbacksByUserId(1).subscribe((data) => {
      this.feedbackList = data;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }

  confirmDelete(feedbackId: number): void {
    this.confirmDeleteId = feedbackId;
  }

  deleteFeedback(): void {
    if (this.confirmDeleteId !== null) {
      this.feedbackService.deleteFeedback(this.confirmDeleteId).subscribe(() => {
        this.feedbackList = this.feedbackList.filter(f => f.feedbackId !== this.confirmDeleteId);
        this.confirmDeleteId = null;
      });
    }
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }
}
