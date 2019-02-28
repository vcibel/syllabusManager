import { Router, ActivatedRoute } from '@angular/router';
import { College } from './../models/college';
import { Department } from './../models/department';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DepartmentComponent } from '../department/department.component';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[];
  tittle = '';
  college: College;
  admin = false;

  constructor(private dialog: MatDialog, private httpService: HttpService, private router: Router,
              private activeRouter: ActivatedRoute, private userService: UserService) { }

  goToSubjects(department) {
    this.router.navigate(['subjects'], {queryParams: {department: JSON.stringify(department)}});
  }

  openDepartment(department) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = department;
    const dialogRef = this.dialog.open(DepartmentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.departments.push(result);
      }
    });
  }


  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }
    console.log(this.activeRouter.queryParams);
    this.activeRouter.queryParams.subscribe(params => {
        console.log(params);
        this.college = JSON.parse(params['college']);
    });
    console.log(this.college);
    if (this.college === undefined) {
      this.tittle = 'DEPARTAMENTOS';
      // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.departments = res.departments;
        console.log(this.departments);
      } else {
        alert(res.response);
      }
    });
    } else {
      this.tittle = this.college.college_name;
      // LISTAR DEPARTAMENTOS EN ESCUELA
      this.httpService.get('/Departments?id=' + this.college.college_id).subscribe((res: any) => {
        if (res.status === 200) {
          this.departments = res.departments;
          console.log(this.departments);
        } else {
          alert(res.response);
        }
      });
    }
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
