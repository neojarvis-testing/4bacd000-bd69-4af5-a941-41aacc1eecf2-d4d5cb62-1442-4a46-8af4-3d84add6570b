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
import { CompositeGuard } from './guards/composite-guard/composite.guard';


const routes: Routes = [
  {path:'edit-loan/:id',component:AdmineditloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'viewLoan',component:ViewloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'createloan',component:CreateloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'confirmDelete/:id',component:ConfirmDeleteComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'loanapplicationform', component:LoanformComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  { path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'admin', component: AdminnavComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  { path: 'user', component: UsernavComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'userappliedloan', component:UserappliedloanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'userviewloan', component:UserviewloanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'confirmDeleteLoan/:id', component:ConfirmDeleteUserAppliedLoanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'viewAppliedLoanDetails/:id',component:ViewAppliedLoanDetailsComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: '**', component: SignupComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
