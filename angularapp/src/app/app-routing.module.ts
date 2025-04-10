import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'admin', component: AdminnavComponent},
  { path: 'user', component: UsernavComponent },
  { path: '**', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
