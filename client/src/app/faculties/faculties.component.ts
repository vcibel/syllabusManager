import { Router } from '@angular/router';
import { Faculty } from './../models/faculty';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FacultyComponent } from '../faculty/faculty.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FacultiesComponent implements OnInit {

  faculties: Faculty[];
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
              private userService: UserService, private alertService: AlertService, public snackBar: MatSnackBar) { }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  goToColleges(faculty) {
    this.router.navigate(['colleges'], {queryParams: {faculty: JSON.stringify(faculty)}});
  }

  openFaculty(faculty) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = faculty;
    const dialogRef = this.dialog.open(FacultyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        if (result !== undefined) {
          this.faculties.push(result);
        }
    });
  }

  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }

    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      this.showLoadder = false;
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  deleteFaculty(faculty) {
    this.httpService.delete(faculty.faculty_id, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Facultad eliminada');
        console.log(res.response);
        this.faculties.splice(this.faculties.indexOf(faculty), 1);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  facultiess(){
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

  subjectss() {
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
