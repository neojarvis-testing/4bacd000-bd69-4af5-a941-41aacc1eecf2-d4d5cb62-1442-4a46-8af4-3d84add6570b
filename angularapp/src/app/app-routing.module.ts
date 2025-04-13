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

import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';

import { HomePageComponent } from './components/home-page/home-page.component';

import { CropLoanComponent } from './components/crop-loan/crop-loan.component';
import { FarmEquipmentLoanComponent } from './components/farm-equipment-loan/farm-equipment-loan.component';
import { LivestockLoanComponent } from './components/livestock-loan/livestock-loan.component';
import { LandPurchaseLoanComponent } from './components/land-purchase-loan/land-purchase-loan.component';
import { FarmAlliedLoanComponent } from './components/farm-allied-loan/farm-allied-loan.component';
import { OtpComponent } from './components/otp/otp.component';



const routes: Routes = [

  {path:'edit-loan/:id',component:AdmineditloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'viewLoan',component:ViewloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'createloan',component:CreateloanComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'confirmDelete/:id',component:ConfirmDeleteComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  {path:'loanapplicationform/:id', component:LoanformComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  { path: 'useraddfeedback', component: UseraddfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'userviewfeedback', component: UserviewfeedbackComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'admin', component: AdminnavComponent, canActivate: [CompositeGuard], data: { role: 'admin' } },
  { path: 'user', component: UsernavComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'userappliedloan', component:UserappliedloanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'userviewloan', component:UserviewloanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'confirmDeleteLoan/:id', component:ConfirmDeleteUserAppliedLoanComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'viewAppliedLoanDetails/:id',component:ViewAppliedLoanDetailsComponent, canActivate: [CompositeGuard], data: { role: 'user' } },
  {path:'viewuserloan',component:UserviewloanComponent},
  {path:'home-page', component:HomePageComponent},
  {path:'requestedloan', component:RequestedloanComponent},
  {path:'home',component:HomePageComponent},
  {path:'crop-loan', component: CropLoanComponent },
  {path:'farm-equipment-loan', component: FarmEquipmentLoanComponent},
  {path:'livestock-loan', component: LivestockLoanComponent},
  {path:'land-purchase-loan', component: LandPurchaseLoanComponent},
  {path:'farm-allied-loan', component: FarmAlliedLoanComponent },
  {path:'loanapplicationform',component:LoanformComponent},
  {path:'**', component: LoginComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
