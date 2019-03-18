import { MatDialogConfig, MatDialog } from '@angular/material';
import { Pensum } from './../models/pensum';
import { HttpService } from './../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePensumComponent } from '../create-pensum/create-pensum.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-pensums',
  templateUrl: './pensums.component.html',
  styleUrls: ['./pensums.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PensumsComponent implements OnInit {

  pensums: Pensum[];
  admin = false;
  showLoadder: boolean = true;

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService,
              private userService: UserService, private alertService: AlertService) { }

  goToPensum(pensum) {
    this.router.navigate(['pensum'], {queryParams: {pensum: JSON.stringify(pensum)}});
  }

  openPensum() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(CreatePensumComponent, dialogConfig);
  }

  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }
    // LISTAR PENSUMS
    this.httpService.get('/Pensum').subscribe((res: any) => {
      this.showLoadder = false;
      if (res.status === 200) {
        this.pensums = res.pensum;
        console.log(this.pensums);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  deletePensum(pensum) {
    this.httpService.delete(pensum.pensum_id, '/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Pensum eliminado!');
        console.log(res.response);
        this.pensums.splice(this.pensums.indexOf(pensum), 1);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
  }

}
