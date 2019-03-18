import { Router } from '@angular/router';
import { College } from './../models/college';
import { HttpService } from './../service/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { Pensum } from '../models/pensum';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-create-pensum',
  templateUrl: './create-pensum.component.html',
  styleUrls: ['./create-pensum.component.scss']
})
export class CreatePensumComponent implements OnInit {

  pensum: Pensum = {
    pensum_id: null,
    college_id: null,
    college_name: '',
    faculty_id: null,
    faculty_name: '',
    pensum_date: null,
  };

  colleges: College[];
  collegeSelected;

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router, private httpService: HttpService, public dialogRef: MatDialogRef<CreatePensumComponent>,
              private alertService: AlertService, public snackBar: MatSnackBar) { }

  onClose() {
    this.dialogRef.close();
  }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  ngOnInit() {
    // LISTAR ESCUELAS
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response)
      }
    });
  }

  setCollege(college_id) {
    console.log(college_id);
    const collegeIndex = this.colleges.findIndex((college) => {
      console.log(college.college_id, college_id);
      return college.college_id === Number(college_id);
    });
    console.log(collegeIndex);
    this.pensum.faculty_id = this.colleges[collegeIndex].faculty_id;
    this.pensum.college_name = this.colleges[collegeIndex].college_name;
    this.pensum.faculty_name = this.colleges[collegeIndex].faculty_name;
    this.pensum.pensum_date = '',
    console.log(this.pensum);
  }

  createPensum() {
    console.log(this.pensum);
    this.httpService.post(this.pensum, '/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res);
        this.pensum.pensum_id = res.pensum_id;
        this.onClose();
        console.log(this.pensum);
        this.router.navigate(['pensum'], {queryParams: {pensum: JSON.stringify(this.pensum)}});
        this.alertService.confirm(' ', 'Pensum creado');
      } else {
        // console.log(res.message);
        this.alertService.confirm('Error', 'Seleccione un escuela');
      }
    });
  }

}
