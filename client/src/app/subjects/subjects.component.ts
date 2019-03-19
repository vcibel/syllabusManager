import { ActivatedRoute, Router } from '@angular/router';
import { Department } from './../models/department';
import { FilesService } from './../service/files/files.service';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

  constructor(private dialog: MatDialog, private httpService: HttpService, private filesService: FilesService,
              private activeRouter: ActivatedRoute, private userService: UserService, private alertService: AlertService,
              private router: Router) { }

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
      this.department = undefined;
        console.log(params);
        if (Object.keys(params).length > 0) {
        this.department = JSON.parse(params['department']);
        }
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
    });
  }

  deleteSubject(subject) {
    this.httpService.delete(subject.subject_id, '/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Materia eliminada!');
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
  
}
