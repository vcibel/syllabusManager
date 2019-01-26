import { FilesService } from './../service/files/files.service';
import { HttpService } from '../service/http/http.service';
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

  constructor(private dialog: MatDialog, private httpService: HttpService, private filesService: FilesService) { }

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
    this.filesService.deleteFile(`/Files?syllabus_url=${subject.syllabus_url}`).subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
      } else {
        alert(res.response);
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
