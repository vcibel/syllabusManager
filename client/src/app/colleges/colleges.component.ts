import { Faculty } from './../models/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../service/http/http.service';
import { College } from './../models/college';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CollegeComponent } from '../college/college.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollegesComponent implements OnInit {

  colleges: College[];
  faculty: Faculty;
  title = '';
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

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToDepartments(college) {
    this.router.navigate(['departments'], {queryParams: {college: JSON.stringify(college)}});
  }

  openCollege(college) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = college;
    const dialogRef = this.dialog.open(CollegeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.colleges.push(result);
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
        this.faculty = JSON.parse(params['faculty']);
    });
    console.log(this.faculty);
    if (this.faculty === undefined) {
      this.title = 'Escuelas';
        // LISTAR ESCUELAS
        this.httpService.get('/Colleges').subscribe((res: any) => {
          this.showLoadder = false;
          if (res.status === 200) {
            this.colleges = res.colleges;
            console.log(this.colleges);
          } else {
            //alert(res.response);
            this.alertService.confirm('Error', res.response)
          }
        });
    } else {
      this.title = this.faculty.faculty_name;
        // LISTAR ESCUELAS DE FACULTAD
        this.httpService.get('/Colleges?id=' + this.faculty.faculty_id).subscribe((res: any) => {
          this.showLoadder = false;
          if (res.status === 200) {
            this.colleges = res.colleges;
            console.log(this.colleges);
          } else {
            //alert(res.response);
            this.alertService.confirm('Error', res.response)
          }
        });
    }
  }

  deleteCollege(college) {
    this.httpService.delete(college.college_id, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.colleges.splice(this.colleges.indexOf(college), 1);
        this.open('Escuela Eliminada!')
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response)
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

  departments() {
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
