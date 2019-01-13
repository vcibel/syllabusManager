import { HttpService } from '../service/http.service';
import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // title = 'Universidad Rafael Urdaneta';
  user: User = {
    user_id: null,
    name: '',
    lastname: '',
    username: '',
    password: '',
    type_user_id: null,
    created_at: '',
};

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  signUp() {
      this.httpService.post(this.user, '/Users').subscribe((res: any) => {
        if (res.status === 200) {
            console.log(res);
            alert(res.response);
        } else {
          console.log(res.message);
        }
      });
    }
}
