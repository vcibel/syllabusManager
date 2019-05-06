import { HttpService } from './../service/http/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert/alert.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  admin = false;

  constructor(private router: Router, private httpService: HttpService, private alertService: AlertService,
    private userService: UserService) { }

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

  ngOnInit() {

    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }

  }

}
