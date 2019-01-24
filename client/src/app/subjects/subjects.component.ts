import { HttpService } from './../service/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SubjectComponent } from '../subject/subject.component';
import { Subject } from '../models/subject';
import { TypeSubject } from '../models/type_subjet';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[];
  typesSubject: TypeSubject[];

  constructor(private dialog: MatDialog, private httpService: HttpService) { }

  openSubject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = this.typesSubject;
    this.dialog.open(SubjectComponent, dialogConfig);
  }

  ngOnInit() {
    // LISTAR MATERIAS
    this.httpService.get('/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        this.subjects = res.subjects;
        this.typesSubject = res.typesSubject;
        console.log(this.subjects, this.typesSubject);
      } else {
        alert(res.response);
      }
    });
  }

  deleteSubject(subject) {
    this.httpService.delete(subject.subject_id, '/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res);
        console.log(res.response);
        this.subjects.splice(this.subjects.indexOf(subject), 1);
        this.deleteFile(subject);
      } else {
        alert(res.response);
      }
    });
  }

  deleteFile(subject) {
    console.log(subject);
    this.httpService.deleteFile(`/Files?syllabus_url=${subject.syllabus_url}`).subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
      } else {
        alert(res.response);
      }
    });
  }

  getSyllabus(subject) {
    this.httpService.getFile(`/Files?syllabus_url=${subject.syllabus_url}&syllabus_name=${subject.syllabus_name}`).subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
      } else {
        alert(res.response);
      }
    });
  }

}
