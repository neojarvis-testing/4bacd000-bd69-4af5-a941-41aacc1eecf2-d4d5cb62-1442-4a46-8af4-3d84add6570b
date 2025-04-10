import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanformComponent } from './components/loanform/loanform.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';

const routes: Routes = [
  {path:'loanapplicationform', component:LoanformComponent},
  {path:'viewuserloan', component:UserviewloanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
