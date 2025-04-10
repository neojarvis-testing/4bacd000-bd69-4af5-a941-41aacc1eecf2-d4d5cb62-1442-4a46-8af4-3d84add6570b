import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {


  feedbackText: string = '';
  popupMessage: string | null = null;

  constructor(private feedbackService : FeedbackService) {}

  submitFeedback(fm :NgForm): void {
    console.log('Submit button clicked');
    console.log(fm.value);
    
    if (!this.feedbackText.trim()) {
      this.popupMessage = 'Feedback is required.';
      return;
    }

    const feedback : Feedback = {
      feedbackText: this.feedbackText,
      userId: 0,
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
