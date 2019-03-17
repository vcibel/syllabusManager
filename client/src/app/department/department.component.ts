import { College } from './../models/college';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
import { Department } from '../models/department';
import { MatDialogRef, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

department: Department = {
  department_id: null,
  department_code: null,
  department_name: '',
  college_id: null,
  department_created_at: null,
  department_updated_at: null
};

new: boolean = true;
colleges: College[];

message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<DepartmentComponent>,
              private alertService: AlertService, public snackBar: MatSnackBar) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.department = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.department);
    console.log(this.new);
  }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  createDepartment() {
    this.httpService.post(this.department, '/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Departamento creado!');
        this.onClose(this.department);
        console.log(res);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  onClose(department) {
    this.dialogRef.close(department);
  }

  updateDepartment() {
    this.httpService.put(this.department, '/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Departamento editado!');
        console.log(res.response);
        this.onClose(undefined);
        this.department = {
          department_id: null,
          department_code: null,
          department_name: '',
          college_id: null,
          department_created_at: null,
          department_updated_at: null
        };
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  ngOnInit() {
    // LISTAR ESCUELAS
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

}
