import { College } from './../models/college';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
import { Department } from '../models/department';
import { MatDialogRef } from '@angular/material';

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

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<DepartmentComponent>) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.department = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.department);
    console.log(this.new);
  }

  createDepartment() {
    this.httpService.post(this.department, '/Departments').subscribe((res: any) => {
        if (res.status === 200) {
         this.onClose(this.department);
          console.log(res);
        } else {
          alert(res.response);
        }
    });
  }

  onClose(department) {
    this.dialogRef.close(department);
  }

  updateDepartment() {
    this.httpService.put(this.department, '/Departments').subscribe((res: any) => {
      if (res.status === 200) {
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
        alert(res.response);
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
        alert(res.response);
      }
    });
  }

}
