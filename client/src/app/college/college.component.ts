import { Faculty } from './../models/faculty';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MDBModalService, MDBModalRef, ModalDirective } from 'angular-bootstrap-md';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { HttpService } from '../service/http/http.service';
import { College } from '../models/college';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  college: College = {
    college_id: null,
    college_code: null,
    college_name: '',
    faculty_id: null,
    faculty_code: null,
    faculty_name: '',
    college_created_at: '',
    college_updated_at: ''
  };
  new: boolean = true;
  faculties: Faculty[];

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<CollegeComponent>, private httpService: HttpService,
              private alertService: AlertService, public snackBar: MatSnackBar) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
        this.college = this.dialogRef._containerInstance._config.data;
        this.new = false;
    }
    console.log(this.college);
    console.log(this.new);
  }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  createCollege() {
    console.log(this.college);
    this.httpService.post(this.college, '/Colleges').subscribe((res: any) => {
        if (res.status === 200) {
          //this.alertService.confirm('', 'Escuela creada');
          this.open('Escuela creada!');
          this.onClose(this.college);
          console.log(res);
          this.college = {
            college_id: null,
            college_code: null,
            college_name: '',
            faculty_id: null,
            faculty_code: null,
            faculty_name: '',
            college_created_at: '',
            college_updated_at: ''
          };
        } else {
         this.alertService.confirm('Error', res.response);
        }
    });
  }

  updateCollege() {
    this.httpService.put(this.college, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Escuela creada!');
        console.log(res.response);
        this.onClose(undefined);
        this.college = {
          college_id: null,
          college_code: null,
          college_name: '',
          faculty_id: null,
          faculty_code: null,
          faculty_name: '',
          college_created_at: '',
          college_updated_at: ''
        };
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  onClose(college) {
    this.dialogRef.close(college);
  }

  ngOnInit() {
    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

}
