import { Router, ActivatedRoute } from '@angular/router';
import { College } from './../models/college';
import { Department } from './../models/department';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { DepartmentComponent } from '../department/department.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DepartmentsComponent implements OnInit {

  departments: Department[];
  title = '';
  college: College;
  admin = false;
  showLoadder: boolean = true;
  Show: boolean = true;
  isFaculty: boolean = false;
  isCollege: boolean  = false;
  isSubject: boolean  = false;
  isDepartment: boolean  = false;
  isUser: boolean  = false;
  isPensum: boolean  = false;

  message: string;
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private dialog: MatDialog, private httpService: HttpService, private router: Router,
              private activeRouter: ActivatedRoute, private userService: UserService, private alertService: AlertService,
              public snackBar: MatSnackBar) { }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

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
      this.title = 'Departamentos';
      // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.showLoadder = false;
        this.departments = res.departments;
        console.log(this.departments);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
    } else {
      this.title = this.college.college_name;
      // LISTAR DEPARTAMENTOS EN ESCUELA
      this.httpService.get('/Departments?id=' + this.college.college_id).subscribe((res: any) => {
        this.showLoadder = false;
        if (res.status === 200) {
          this.departments = res.departments;
          console.log(this.departments);
        } else {
          this.alertService.confirm('Error', res.response);
        }
      });
    }
  }

    deleteDepartment(department) {
      this.httpService.delete(department.department_id, '/Departments').subscribe((res: any) => {
        if (res.status === 200) {
          this.open('Departamento eliminado!')
          console.log(res.response);
          this.departments.splice(this.departments.indexOf(department), 1);
        } else {
          //alert(res.response);
          this.alertService.confirm('Error', res.response);
        }
      });
    }

    faculties(){
      this.Show = false;
      this.isCollege = false;
      this.isSubject= false;
      this.isDepartment= false;
      this.isUser= false;
      this.isPensum= false;
      if (!this.isFaculty) {
        this.isFaculty = true;
      }
    }
  
    collegess() {
      this.Show= false;
      this.isFaculty= false;
      this.isSubject= false;
      this.isDepartment= false;
      this.isUser= false;
      this.isPensum= false;
      if (!this.isCollege) {
        this.isCollege = true;
      }
    }
  
    subjects() {
      this.Show= false;
      this.isCollege = false;
      this.isFaculty= false;
      this.isDepartment= false;
      this.isUser= false;
      this.isPensum= false;
      if (!this.isSubject) {
        this.isSubject = true;
      } 
    }
  
    department() {
      this.Show= false;
      this.isCollege = false;
      this.isFaculty= false;
      this.isSubject= false;
      this.isUser= false;
      this.isPensum= false;
      if (!this.isDepartment) {
        this.isDepartment = true;
      }
    }
  
    users() {
      this.Show= false;
      this.isCollege = false;
      this.isFaculty= false;
      this.isDepartment= false;
      this.isSubject= false;
      this.isPensum= false;
      if (!this.isUser) {
        this.isUser = true;
      }
    }
  
    pensum() {
      this.Show= false;
      this.isCollege = false;
      this.isFaculty= false;
      this.isDepartment= false;
      this.isUser= false;
      this.isSubject= false;
      if (!this.isPensum) {
        this.isPensum = true;
      } 
    }

    logout() {
      this.httpService.get('/Logout').subscribe((res: any) => {
          this.router.navigateByUrl('/');
          this.open('Sesión cerrada!');
      });
    }
}
