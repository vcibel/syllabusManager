import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../models/department';
import { FilesService } from './../service/files/files.service';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SubjectComponent } from '../subject/subject.component';
import { Subject } from '../models/subject';
import { TypeSubject } from '../models/type_subjet';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[];
  typesSubject: TypeSubject[];
  department: Department;
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

  constructor(private dialog: MatDialog, private httpService: HttpService, private filesService: FilesService,
              private activeRouter: ActivatedRoute, private userService: UserService, private alertService: AlertService,
              public snackBar: MatSnackBar, private router: Router) { }

  open(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  openSubject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {typesSubject: this.typesSubject, subjects: this.subjects};
    const dialogRef = this.dialog.open(SubjectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.subjects.push(result);
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
        this.department = JSON.parse(params['department']);
    });
    console.log(this.department);
    if (this.department === undefined) {
      this.title = 'Materias';
      // LISTAR MATERIAS
      this.httpService.get('/Subjects').subscribe((res: any) => {
        this.showLoadder = false;
        if (res.status === 200) {
          this.subjects = res.subjects;
          this.typesSubject = res.types;
          console.log(this.subjects, this.typesSubject);
        } else {
          //alert(res.response);
          this.alertService.confirm('Error!', res.response);
        }
      });
    } else {
      this.title = this.department.department_name;
      // LISTAR MATERIAS EN DEPARTAMENTO
      this.httpService.get('/Subjects?department_id=' + this.department.department_id).subscribe((res: any) => {
        this.showLoadder = false;
        if (res.status === 200) {
          this.subjects = res.subjects;
          this.typesSubject = res.types;
          console.log(this.subjects, this.typesSubject);
        } else {
          //alert(res.response);
          this.alertService.confirm('Error!', res.response);
        }
      });
    }
  }

  deleteSubject(subject) {
    this.httpService.delete(subject.subject_id, '/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        this.open('Materia eliminada!');
        console.log(res);
        console.log(res.response);
        this.subjects.splice(this.subjects.indexOf(subject), 1);
        this.deleteFile(subject);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

  deleteFile(subject) {
    console.log(subject);
    this.filesService.deleteFile(`/Files?syllabus_url=${subject.syllabus_url}`).subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
      } else {
        //alert(res.response);
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

  getSyllabus(subject) {
    this.filesService.getFile(`/Files?syllabus_url=${subject.syllabus_url}&syllabus_name=${subject.syllabus_name}`);
    // .subscribe((res: any) => {
    //  console.log(res);
    //  if (res.status === 200) {
        // console.log(res.response);
    //  } else {
    //    alert(res.response);
    //  }
    // });
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
