import { HttpService } from '../service/http/http.service';
import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
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

message: string;
actionButtonLabel: string = '';
action: boolean = true;
setAutoHide: boolean = true;
autoHide: number = 2000;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<SignupComponent>,
              private alertService: AlertService, public snackBar: MatSnackBar) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.user = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.user);
    console.log(this.new);
  }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  ngOnInit() {
  }

  signUp() {
      this.httpService.post(this.user, '/Users').subscribe((res: any) => {
        if (res.status === 200) {
            this.open('Usuario creado!');
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
          this.alertService.confirm('Error!', res.message)
        }
      });
    }

    updateUser() {
      this.httpService.put(this.user, '/Users').subscribe((res: any) => {
        if (res.status === 200) {
          this.open('Usario editado!');
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
          this.alertService.confirm('Error!', res.response);
        }
      });
    }

    onClose(user) {
      this.dialogRef.close(user);
    }
}

