import { PensumsComponent } from './pensums/pensums.component';
import { UsersComponent } from './users/users.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { DepartmentsComponent } from './departments/departments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { PensumComponent } from './pensum/pensum.component';
import { CollegesComponent } from './colleges/colleges.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'pensum', component: PensumComponent},
  {path: 'pensums', component: PensumsComponent},
  {path: 'faculties', component: FacultiesComponent},
  {path: 'colleges', component: CollegesComponent},
  {path: 'departments', component: DepartmentsComponent},
  {path: 'subjects', component: SubjectsComponent},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
