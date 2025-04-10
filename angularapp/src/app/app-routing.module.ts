import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanformComponent } from './components/loanform/loanform.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [
  {path:'loanapplicationform', component:LoanformComponent},
  {path:'viewuserloan', component:UserviewloanComponent},
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent},
  { path: 'useraddfeedback', component: UseraddfeedbackComponent},
  { path: 'userviewfeedback', component: UserviewfeedbackComponent},
  { path: '', redirectTo: '/useraddfeedback', pathMatch: 'full'}, // Default route
  { path: '**', redirectTo: '/useraddfeedback' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
