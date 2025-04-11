import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app-config';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient : HttpClient) { }

  public sendFeedback(feedback : Feedback) : Observable<any>{
    console.log("In the service page")
    console.log(feedback)
    return  this.httpClient.post(AppConfig.baseUrl + 'api/feedback', feedback);
  }

  public getFeedbacks() : Observable<any>{
    return this.httpClient.get(AppConfig.baseUrl + 'api/feedback');
  }
  
  public getFeedbacksByUserId(userId : number) : Observable<any>{
    return this.httpClient.get(AppConfig.baseUrl + 'api/feedback/user/' + userId);
  }

  public deleteFeedback(feedbackId: number): Observable<string> {
    return this.httpClient.delete(AppConfig.baseUrl + 'api/feedback/' + feedbackId, { responseType: 'text' });
  }  
}
