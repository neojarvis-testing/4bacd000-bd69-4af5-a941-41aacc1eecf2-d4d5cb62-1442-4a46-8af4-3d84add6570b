import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackText: string = '';
  popupMessage: string | null = null;
  userId: number;

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId'));
  }

  constructor(private feedbackService: FeedbackService) { }

  submitFeedback(fm: NgForm): void {
    console.log('Submit button clicked');
    console.log("This is the user id")
    console.log(this.userId);
    console.log(fm.value);

    if (!this.feedbackText.trim()) {
      this.popupMessage = 'Feedback is required.';
      return;
    }

    const feedback: Feedback = {
      feedbackText: this.feedbackText,
      userId: this.userId,
      user: {
        userId: this.userId
      },
      date: new Date()
    };

    this.feedbackService.sendFeedback(feedback).subscribe(() => {
      this.popupMessage = 'Successfully Added!';
      this.feedbackText = '';
    },
      (error) => {
        console.error('Error submitting feedback:', error);
      });
  }

  closePopup(): void {
    this.popupMessage = null;

  }
}
