import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = "https://ide-fbbcebfdaefdbfeafbdddcbaafdaddb.premiumproject.examly.io/proxy/8080";
  constructor(private httpClient : HttpClient) { }

  public sendFeedback(feedback : Feedback) : Observable<any>{
    console.log("In the service page")
    console.log(feedback)
    return  this.httpClient.post(this.baseUrl +"/api/feedback", feedback);
  }

  public getFeedbacks() : Observable<any>{
    return this.httpClient.get(this.baseUrl + "/api/feedback");
  }
  
  public getFeedbacksByUserId(userId : number) : Observable<any>{
    return this.httpClient.get(this.baseUrl + '/api/feedback/user/' + userId);
  }

  public deleteFeedback(feedbackId : number) : Observable<any>{
    return this.httpClient.delete(this.baseUrl + '/' + feedbackId);
  }
}
