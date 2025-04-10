import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

const routes: Routes = [
  {path:'edit-loan/:id',component:AdmineditloanComponent},
  {path:'viewLoan',component:ViewloanComponent},
  {path:'confirmDelete/:id',component:ConfirmDeleteComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
