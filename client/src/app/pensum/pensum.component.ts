import { Pensum } from './../models/pensum';
import { SubjectPensum } from './../models/subject_pensum';
import { HttpService } from './../service/http/http.service';
import { Faculty } from './../models/faculty';
import { Subject } from './../models/subject';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

export class PensumComponent implements OnInit {

  subjects: Subject[];
  typesSubjectPensum;
  showFiller = false;
  pensum: Pensum;
  done = [[], [], [], [], []];

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private activeRouter: ActivatedRoute, private httpService: HttpService) {}

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
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
    console.log(this.activeRouter.queryParams);
    this.activeRouter.queryParams.subscribe(params => {
      console.log(params);
        this.pensum = JSON.parse(params['pensum']);
    });
    // LISTAR TODAS LAS MATERIAS
    this.httpService.get('/Subjects?id=' + this.pensum.faculty_id).subscribe((res: any) => {
      if (res.status === 200) {
        this.subjects = res.subjects;
        this.typesSubjectPensum = res.types;
        console.log(this.subjects, this.typesSubjectPensum);
      } else {
        alert(res.response);
      }
    });
    // LISTAR MATERIAS EN PENSUM
    this.httpService.get('/SubjectPensum?id=' + this.pensum.pensum_id).subscribe((res: any) => {
      console.log(res);
      if (res.status === 200) {
        for (let i = 0; i < res.pensumSubjects.length; i++) {
          this.done[res.pensumSubjects.term].push(res.pensumSubjects);
        }
        console.log();
      } else {
        alert(res.response);
      }
    });
  }
}
