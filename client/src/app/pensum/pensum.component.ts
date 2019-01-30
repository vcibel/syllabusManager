import { SubjectPensum } from './../models/subject_pensum';
import { HttpService } from './../service/http/http.service';
import { Faculty } from './../models/faculty';
import { Subject } from './../models/subject';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreatePensumComponent } from '../create-pensum/create-pensum.component';

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

export class PensumComponent implements OnInit {

  subjects: Subject[];
  faculty: Faculty;
  typesSubjectPensum;
  showFiller = false;
  done = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fith: [],
    sixth: [],
    seventh: [],
    eigth: [],
    nineth: [],
    tenth: [],
  };

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService) { }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  openPensum() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(CreatePensumComponent, dialogConfig);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  createPensum() {
    this.httpService.post(this.done, '/SubjectPensum').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
      } else {
        console.log(res.message);
      }
    });
  }

  ngOnInit() {
    // LISTAR MATERIAS
    this.httpService.get('/Subjects?id=2').subscribe((res: any) => { // + this.faculty.faculty_id
      if (res.status === 200) {
        this.subjects = res.subjects;
        this.typesSubjectPensum = res.types;
        console.log(this.subjects, this.typesSubjectPensum);
      } else {
        alert(res.response);
      }
    });
  }

}
