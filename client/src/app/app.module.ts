import { MatSidenavModule, MatListModule, MatButtonModule, MatCheckboxModule, 
  MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatDividerModule, 
  MatGridListModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CareerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDividerModule,
    AppRoutingModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class AppModule { }
