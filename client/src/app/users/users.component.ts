import { HttpService } from '../service/http/http.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  admin = false;
  showLoadder: boolean = true;

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private dialog: MatDialog, private httpService: HttpService, private userService: UserService,
              private alertService: AlertService, public snackBar: MatSnackBar ) { }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  openRegister(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(SignupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.users.push(result);
      }
    });
  }

  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }
    // LISTAR USUARIOS
    this.httpService.get('/Users').subscribe((res: any) => {
      this.showLoadder = false;
      if (res.status === 200) {
        this.users = res.users;
        console.log(this.users, this.userService.user);
        const remove = this.users.findIndex((user) => {
          console.log(user.user_id, this.userService.user.user_id);
          return user.user_id === this.userService.user.user_id;
        });
        console.log(remove);
        this.users.splice(remove, 1);
        // this.users.splice(this.users.indexOf(this.userService.user), 1);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

  deleteUser(user) {
    this.httpService.delete(user.user_id, '/Users').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Usuario Eliminado!');
        console.log(res.response);
        this.users.splice(this.users.indexOf(user), 1);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

}
