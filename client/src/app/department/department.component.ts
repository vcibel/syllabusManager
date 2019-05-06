import { College } from './../models/college';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
import { Department } from '../models/department';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

department= {
  department_id: null,
  department_code: null,
  department_name: '',
  college_id: null,
  college_name: '',
  department_created_at: null,
  department_updated_at: null
} 

new = true;
colleges: College[];
college_selected: College;

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<DepartmentComponent>,
              private alertService: AlertService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.department = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.department);
    console.log(this.new);
  }

  createDepartment() {
    console.log(this.department);
    // this.department.college_code = this.college_selected.college_code;
    this.department.college_name = this.college_selected.college_name;
    this.department.college_id = this.college_selected.college_id;
    if (this.department.department_name === '' || this.department.department_code === null || this.department.college_id === null){
      this.alertService.confirm('Error', 'Por favor introduzca todos los campos');
    } else {
    this.httpService.post(this.department, '/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.department.department_id = res.department_id;
        this.alertService.open('Departamento creado!');
        this.onClose(this.department);
        console.log(res);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
    }
  }

  onClose(department) {
    this.dialogRef.close(department);
  }

  updateDepartment() {
    this.httpService.put(this.department, '/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Departamento editado!');
        console.log(res.response);
        this.onClose(undefined);
        /*this.department = {
          department_id: null,
          department_code: null,
          department_name: '',
          college_id: null,
          department_created_at: null,
          department_updated_at: null
        };*/
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
