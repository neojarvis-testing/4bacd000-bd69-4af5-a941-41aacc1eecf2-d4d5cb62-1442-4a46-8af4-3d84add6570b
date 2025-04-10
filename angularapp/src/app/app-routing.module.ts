import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  {path:'edit-loan/:id',component:AdmineditloanComponent},
  {path:'viewLoan',component:ViewloanComponent},
  {path:'confirmDelete/:id',component:ConfirmDeleteComponent},
  {path:'loanapplicationform', component:LoanformComponent},
  {path:'viewuserloan', component:UserviewloanComponent},
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent},
  { path: 'useraddfeedback', component: UseraddfeedbackComponent},
  { path: 'userviewfeedback', component: UserviewfeedbackComponent},
  { path: '**', redirectTo: '/register' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
