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

  constructor(private router: Router, private httpService: HttpService, private userService: UserService,
              private alertService: AlertService) {

  }

  alertError() {
    this.alertService.confirm('Error', 'Error! Usuario o Contraseña Invalida')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  alert() {
    this.alertService.confirm('Bienvenido', 'Usted ha iniciado sesión')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnInit() {
  }

  login() {
    this.httpService.post(this.user, '/Login').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
          this.userService.user = res.user;
          console.log(this.userService.user);
          // this.router.navigate(['home'], {queryParams: {type_user: res.type_user_id}});
          console.log('logged in')
          this.router.navigateByUrl('/home');
          this.alert();
      } else {
        console.log(res.response);
        console.log('error');
        // this.alerts.setMessage('Error! wrong password','error');
      //  this.alertError();
      this.alertService.confirm('Error', res.response);
      }
    });
  }

}
