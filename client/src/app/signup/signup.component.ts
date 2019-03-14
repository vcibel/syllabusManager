import { HttpService } from '../service/http/http.service';
import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // title = 'Universidad Rafael Urdaneta';
  user: User = {
    user_id: null,
    user_name: '',
    user_lastname: '',
    user_username: '',
    user_password: '',
    type_user_id: null,
    user_created_at: '',
};
new: boolean = true;

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<SignupComponent>,
              private alertService: AlertService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.user = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.user);
    console.log(this.new);
  }

  ngOnInit() {
  }

  signUp() {
      this.httpService.post(this.user, '/Users').subscribe((res: any) => {
        if (res.status === 200) {
            this.alertService.confirm('', 'Usuario creado');
            console.log(res);
            this.onClose(this.user);
            this.user = {
              user_id: null,
              user_name: '',
              user_lastname: '',
              user_username: '',
              user_password: '',
              type_user_id: null,
              user_created_at: '',
          };
            //alert(res.response);
            //this.alertService.confirm('', res.response);
        } else {
          console.log(res.message);
          this.alertService.confirm('Error', res.message)
        }
      });
    }

    updateUser() {
      this.httpService.put(this.user, '/Users').subscribe((res: any) => {
        if (res.status === 200) {
          this.alertService.confirm('', 'Usario editado');
          console.log(res.response);
          this.onClose(undefined);
          this.user = {
            user_id: null,
            user_name: '',
            user_lastname: '',
            user_username: '',
            user_password: '',
            type_user_id: null,
            user_created_at: '',
        };
        } else {
          //alert(res.response);
          this.alertService.confirm('', res.response);
        }
      });
    }

    onClose(user) {
      this.dialogRef.close(user);
    }
}

