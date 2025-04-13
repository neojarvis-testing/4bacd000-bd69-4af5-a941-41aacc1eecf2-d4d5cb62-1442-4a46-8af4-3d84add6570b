import { User } from "./user.model";

export interface Feedback {
    feedbackId?:number;
    user?:User;
    feedbackText?:string;
    date?:Date;
    userId:number;
}
