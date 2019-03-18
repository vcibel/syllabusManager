import { HttpService } from './../service/http/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router, private httpService: HttpService, private alertService: AlertService) { }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToFaculties() {
    this.router.navigateByUrl('/faculties');
  }

  goToColleges() {
    this.router.navigateByUrl('/colleges');
  }

  goToUsers() {
    this.router.navigateByUrl('/users');
  }

  goToPensum() {
    this.router.navigateByUrl('/pensums');
  }

  goToSubjects() {
    this.router.navigateByUrl('/subjects');
  }

  goToDepartments() {
    this.router.navigateByUrl('/departments');
  }

  logout() {
    this.httpService.get('/Logout').subscribe((res: any) => {
        this.router.navigateByUrl('/');
        this.alertService.open('Sesión cerrada!');
    });
  }

  ngOnInit() {}

}
