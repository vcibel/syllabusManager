import { HttpService } from '../service/http/http.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private httpService: HttpService) {

  }

  ngOnInit() {
  }

  login() {
    this.httpService.post(this.user, '/Login').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
          this.router.navigateByUrl('/home');
      } else {
        console.log(res.message);
      }
    });
  }

}
