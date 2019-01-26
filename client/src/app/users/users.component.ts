import { HttpService } from '../service/http/http.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private dialog: MatDialog, private httpService: HttpService) { }

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
    // LISTAR USUARIOS
    this.httpService.get('/Users').subscribe((res: any) => {
      if (res.status === 200) {
        this.users = res.users;
        console.log(this.users);
      } else {
        alert(res.response);
      }
    });
  }

  deleteUser(user) {
    this.httpService.delete(user.user_id, '/Users').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
      } else {
        alert(res.response);
      }
    });
  }

}
