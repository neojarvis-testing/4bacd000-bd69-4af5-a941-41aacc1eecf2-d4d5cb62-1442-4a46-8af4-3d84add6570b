import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  subscription: Subscription;
  feedbackText: string = '';
  rating : number | null = null;
  popupMessage: string | null = null;
  userId: number;
  feedbackForm: FormGroup;

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId'));
  }

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.minLength(5)]],
      rating: ['', Validators.required]
    });
   }

   public submitFeedback(): void {
    console.log('Submit button clicked');
    console.log("This is the user id:");
    console.log(this.userId);
    console.log(this.feedbackForm.value);

    if (this.feedbackForm.invalid) {
      this.popupMessage = 'Feedback is required.';
      return;
    }

    const feedback: Feedback = {
      feedbackText: this.feedbackForm.get('feedbackText')?.value,
      userId: this.userId,
      user: {
        userId: this.userId
      },
      date: new Date(),
      rating: this.feedbackForm.get('rating')?.value
    };

    this.subscription=this.feedbackService.sendFeedback(feedback).subscribe({
      next: () => {
        this.popupMessage = 'Successfully Added!';
        this.feedbackForm.reset();
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
      }
    });
}


public closePopup(): void {
    this.popupMessage = null;

  }

  public ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
