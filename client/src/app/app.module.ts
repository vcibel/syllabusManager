import { HttpService } from './service/http.service';
import { MatSidenavModule, MatListModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatIconModule, MatCardModule, MatDividerModule,
  MatGridListModule, MatMenuModule, MatExpansionModule, MatSelectModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
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
import { ModalsComponent } from './modals/modals.component';
import { SubjectComponent } from './subject/subject.component';
import { DeparmentComponent } from './deparment/deparment.component';
import { FacultiesComponent } from './faculties/faculties.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CareerComponent,
    ModalsComponent,
    SubjectComponent,
    DeparmentComponent,
    FacultiesComponent
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
  entryComponents: [ ModalsComponent, SubjectComponent ],
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
