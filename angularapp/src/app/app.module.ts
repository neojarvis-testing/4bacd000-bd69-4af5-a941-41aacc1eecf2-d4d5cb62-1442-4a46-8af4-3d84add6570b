import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { SignupComponent } from './components/signup/signup.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDeleteUserAppliedLoanComponent } from './components/confirm-delete-user-applied-loan/confirm-delete-user-applied-loan.component';
import { ViewAppliedLoanDetailsComponent } from './components/view-applied-loan-details/view-applied-loan-details.component';

import { CropLoanComponent } from './components/crop-loan/crop-loan.component';
import { FarmEquipmentLoanComponent } from './components/farm-equipment-loan/farm-equipment-loan.component';
import { LivestockLoanComponent } from './components/livestock-loan/livestock-loan.component';
import { LandPurchaseLoanComponent } from './components/land-purchase-loan/land-purchase-loan.component';
import { FarmAlliedLoanComponent } from './components/farm-allied-loan/farm-allied-loan.component';
import { OtpComponent } from './components/otp/otp.component';



@NgModule({
  declarations: [
    AppComponent,
    AdmineditloanComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AuthguardComponent,
    CreateloanComponent,
    ErrorComponent,
    HomePageComponent,
    LoanformComponent,
    LoginComponent,
    NavbarComponent,
    RequestedloanComponent,
    SignupComponent,
    UseraddfeedbackComponent,
    UserappliedloanComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewloanComponent,
    ViewloanComponent,
    ConfirmDeleteComponent,
    ConfirmDeleteUserAppliedLoanComponent,
    ViewAppliedLoanDetailsComponent,
    CropLoanComponent,
    FarmEquipmentLoanComponent,
    LivestockLoanComponent,
    LandPurchaseLoanComponent,
    FarmAlliedLoanComponent,
    OtpComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
