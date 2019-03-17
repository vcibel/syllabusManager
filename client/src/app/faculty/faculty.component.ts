import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Faculty } from '../models/faculty';
import { HttpService } from '../service/http/http.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  faculty: Faculty = {
    faculty_id: null,
    faculty_code: null,
    faculty_name: '',
    faculty_created_at: '',
    faculty_updated_at: ''
  };

  new: boolean = true;

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<FacultyComponent>, private httpService: HttpService,
              private alertService: AlertService, public snackBar: MatSnackBar) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.faculty = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.faculty);
    console.log(this.new);
  }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  createFaculty() {
    console.log(this.faculty);
    this.faculty.faculty_code = Number(this.faculty.faculty_code);
      this.httpService.post(this.faculty, '/Faculties').subscribe((res: any) => {
          if (res.status === 200) {
            this.open('Facultad creada!');
            this.onClose(this.faculty);
            console.log(res);
            this.faculty = {
              faculty_id: null,
              faculty_code: null,
              faculty_name: '',
              faculty_created_at: '',
              faculty_updated_at: ''
            };
          } else {
            this.alertService.confirm('Error', res.response);
          }
      });
  }

  updateFaculty() {
    this.httpService.put(this.faculty, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Facultad editada!');
        console.log(res.response);
        this.onClose(undefined);
        this.faculty = {
              faculty_id: null,
              faculty_code: null,
              faculty_name: '',
              faculty_created_at: '',
              faculty_updated_at: ''
        };
      } else {
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

  onClose(faculty) {
    this.dialogRef.close(faculty);
  }

  ngOnInit() {
  }
}
