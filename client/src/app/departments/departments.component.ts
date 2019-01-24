import { Department } from './../models/department';
import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DepartmentComponent } from '../department/department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[];

  constructor(private dialog: MatDialog, private httpService: HttpService) { }

  openDepartment(department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = department;
    this.dialog.open(DepartmentComponent, dialogConfig);
  }


  ngOnInit() {
    // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.departments = res.departments;
        console.log(this.departments);
      } else {
        alert(res.response);
      }
    });
  }

    deleteDepartment(department) {
      this.httpService.delete(department.department_id, '/Departments').subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res.response);
          this.departments.splice(this.departments.indexOf(department), 1);
        } else {
          alert(res.response);
        }
      });
    }
}
