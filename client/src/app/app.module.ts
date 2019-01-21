import { HttpService } from './service/http.service';
import { MatSidenavModule, MatListModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatIconModule, MatCardModule, MatDividerModule,
  MatGridListModule, MatMenuModule, MatExpansionModule, MatSelectModule, MatDialogModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CareerComponent } from './career/career.component';
import { HttpClientModule } from '@angular/common/http';
import { SubjectComponent } from './subject/subject.component';
import { FacultiesComponent } from './faculties/faculties.component';
import { CollegesComponent } from './colleges/colleges.component';
import { CollegeComponent } from './college/college.component';
import { FacultyComponent } from './faculty/faculty.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentsComponent } from './departments/departments.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CareerComponent,
    CollegeComponent,
    SubjectComponent,
    FacultiesComponent,
    CollegesComponent,
    FacultyComponent,
    SubjectsComponent,
    DepartmentComponent,
    DepartmentsComponent
  ],
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatDividerModule,
    AppRoutingModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
  ],
  entryComponents: [ CollegeComponent, SubjectComponent, FacultyComponent, DepartmentComponent ],
  providers: [
    HttpService
  ],
  bootstrap: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class AppModule { }
