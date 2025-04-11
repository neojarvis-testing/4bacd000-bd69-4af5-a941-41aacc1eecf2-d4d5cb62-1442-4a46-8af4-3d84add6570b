import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { ConfirmDeleteUserAppliedLoanComponent } from './components/confirm-delete-user-applied-loan/confirm-delete-user-applied-loan.component';
import { ViewAppliedLoanDetailsComponent } from './components/view-applied-loan-details/view-applied-loan-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  {path:'edit-loan/:id',component:AdmineditloanComponent},
  {path:'viewLoan',component:ViewloanComponent},
  {path:'createloan',component:CreateloanComponent},
  {path:'confirmDelete/:id',component:ConfirmDeleteComponent},
  {path:'loanapplicationform', component:LoanformComponent},
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent},
  { path: 'useraddfeedback', component: UseraddfeedbackComponent},
  { path: 'userviewfeedback', component: UserviewfeedbackComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'admin', component: HomePageComponent},
  { path: 'user', component: HomePageComponent },
  {path:'userappliedloan', component:UserappliedloanComponent},
  {path:'userviewloan', component:UserviewloanComponent},
  {path:'createloan',component:CreateloanComponent},
  {path:'confirmDeleteLoan/:id', component:ConfirmDeleteUserAppliedLoanComponent},
  {path:'home-page', component:HomePageComponent},
  {path:'viewAppliedLoanDetails/:id',component:ViewAppliedLoanDetailsComponent},
  { path: '**', component: SignupComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
