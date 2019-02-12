import { SubjectPensum } from './../models/subject_pensum';
import { Pensum } from './../models/pensum';
import { HttpService } from './../service/http/http.service';
import { Subject } from './../models/subject';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';

export interface Section {
  hc: number;
  name: string;
  code: string;
  id: any;
}

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

export class PensumComponent implements OnInit, AfterViewInit {

  jsPlumbInstance;
  add = false;
  buttonNameAdd = 'Dibujar Prelación';

  subjects: Subject[];
  subjectSource;
  typesSubjectPensum;
  showFiller = false;
  pensum: Pensum;
  done = [[], [], [], [], []];
  source = '';
  target = '';

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private activeRouter: ActivatedRoute, private httpService: HttpService) {}

   ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
   }

   addRestriction() {
    this.add = ! this.add;
    if ( this.add) {
      this.buttonNameAdd = 'Prelación Lista';
    } else {
      this.buttonNameAdd = 'Dibujar Prelación';
      this.source = '';
      this.target = '';
    }
  }

  onClick(event, subject) {
    if (this.add) {
      if (this.source === '') {
        this.source = event.target.id;
        this.subjectSource = subject;
      } else {
        this.target = event.target.id;
        this.connectSourceToTargetUsingJSPlumb(this.source, this.target);
        this.subjectSource['subject_restriction'] = this.target;
        this.source = '';
        this.target = '';
      }
    }
    console.log(event, this.source, this.target);
    console.log(this.subjectSource, this.done);
  }

  connectSourceToTargetUsingJSPlumb(source, target) {
    // let labelName;
    //   labelName = 'connection';
    const conn = this.jsPlumbInstance.connect({
        connector: ['Flowchart', {stub: [10, 10], cornerRadius: 4, alwaysRespectStubs: true}],
        endpointStyle: {fill: 'transparent'},
        source: source,
        target: target,
        detachable: false,
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#456', strokeWidth: 2},
      });
    const myJsPlumb = this.jsPlumbInstance;
    conn.bind('dblclick', myConn => {
      console.log(myConn);
      myJsPlumb.deleteConnection(myConn);
    });
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const arrayString = event.container.id.split('-');
      const term = Number(arrayString[arrayString.length - 1]);
      this.done[term][event.currentIndex]['pensum_id'] = this.pensum.pensum_id;
      this.done[term][event.currentIndex]['type_subject_pensum_id'] = 1;
      this.done[term][event.currentIndex]['term'] = term;
      console.log(term, this.done);
    }
    /*if (term !== 0 && this.subjectPensum[term - 1]) {
      this.subjectPensum[term - 1].push({
        subject_id: event.container.data[0],
        pensum_id: this.pensum.pensum_id,
        type_subject_pensum_id: 1,
        term: term,
        subject_restriction: null,
        hour_restriction: null,
      });
    }*/
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
