import { UserService } from './../service/user/user.service';
import { HttpService } from '../service/http/http.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Universidad Rafael Urdaneta';
  user: User = {
    user_id: null,
    user_name: '',
    user_lastname: '',
    user_username: '',
    user_password: '',
    type_user_id: null,
    user_created_at: '',
  };

  showLoadder: boolean = false;
  show: boolean = true;

  constructor(private router: Router, private httpService: HttpService, private userService: UserService,
              private alertService: AlertService) {

  }

  ngOnInit() {
  }

  login() {
    this.show = false;
    this.showLoadder = true;
    this.httpService.post(this.user, '/Login').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
          this.userService.user = res.user;
          console.log(this.userService.user);
          console.log('logged in')
          this.router.navigateByUrl('/home');
          this.alertService.open('Bienvenido!');
      } else {
        console.log(res.response);
        console.log('error');
      this.alertService.confirm('Error', res.response);
      this.showLoadder = false;
      this.show = true;
      }
    });
  }

}
