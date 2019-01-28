import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { PensumComponent } from './pensum/pensum.component';

const appRoutes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'pensum',component: PensumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
