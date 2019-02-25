import { SubjectPensum } from './../models/subject_pensum';
import { Pensum } from './../models/pensum';
import { HttpService } from './../service/http/http.service';
import { Subject } from './../models/subject';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';
//import { FormControl } from '@angular/forms';
//import { MomentDateAdapter } from '@angular/material-moment-adapter';
//import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as  _moment from 'moment';
import { default as _rollupMoment} from 'moment';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

const moment = _rollupMoment || _moment;

//const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// parse: {
//   dateInput: 'MM/YYYY',
// },
// display: {
//   dateInput: 'MM/YYYY',
//   monthYearLabel: 'MMM YYYY',
//   dateA11yLabel: 'LL',
//   monthYearA11yLabel: 'MMMM YYYY',
// },

export interface Section {
  hc: number;
  name: string;
  code: string;
  id: any;
}

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class PensumComponent implements OnInit, AfterViewInit {

  date = new FormControl(moment());

  jsPlumbInstance;
  add = false;
  buttonNameAdd = 'Dibujar Prelación';
  isFront: boolean  = true;
  isBack: boolean  = false;
  Show: boolean = false;

  subjects: Subject[];
  typesSubjectPensum;
  showFiller = false;
  pensum: Pensum;
  done = [[], [], [], [], [], [], [], [], [], [], []];
  electives = [];
  source = '';
  target = '';
  restriction = {
    subject_id_source_restriction: null,
    subject_id_target_restriction: null,
  };
  new = true;

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done2 = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private activeRouter: ActivatedRoute, private httpService: HttpService) {}

   ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
   }

   togglePensumF() {
    this.isBack = false;
    if (!this.isFront) {
      this.isFront = true;
    }
  }

  togglePensumB() {
    this.isFront = false;
    if (!this.isBack) {
      this.isBack = true;
    }
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

  onClick(event) {
    if (this.add) {
      if (this.source === '') {
        this.source = event.target.id;
        this.restriction.subject_id_source_restriction = this.source;
      } else {
        this.target = event.target.id;
        this.connectSourceToTargetUsingJSPlumb(this.source, this.target);
        this.restriction.subject_id_target_restriction = this.target;
        this.done[0].push(this.restriction);
        this.source = '';
        this.target = '';
        this.restriction = {
          subject_id_source_restriction: null,
          subject_id_target_restriction: null,
        };
      }
    }
    console.log(event, this.source, this.target);
    console.log(this.done);
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
      const restriction = {
        subject_id_source_restriction: source,
        subject_id_target_restriction: target,
      };
      this.done[0].splice(this.done[0].indexOf(restriction), 1);
      console.log(restriction, this.done[0]);
    });
    return '';
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
      console.log(arrayString, arrayString[arrayString.length - 1])
      this.done[term][event.currentIndex]['type_subject_pensum_id'] = 1;
      this.done[term][event.currentIndex]['term'] = term;
      this.done[term][event.currentIndex]['hour_restriction'] = 0;
      console.log(term, this.done);
    }
  }

  drop2(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.electives[event.currentIndex]['type_subject_pensum_id'] = 2;
      this.electives[event.currentIndex]['term'] = 10;
      this.electives[event.currentIndex]['hour_restriction'] = 0;
      console.log(this.electives);
    }
  }

  save() {
      if (this.new) {
          this.createPensum();
      } else {
          this.updatePensum();
      }
  }

  createPensum() {
    this.done['11'] = this.electives;
    const data = {data: this.done, pensum_id: this.pensum.pensum_id};
    console.log(data);
    this.httpService.post(data, '/SubjectPensum').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
      } else {
        console.log(res.message);
      }
    });
  }

  updatePensum() {
    this.done['11'] = this.electives;
    const data = {data: this.done, pensum_id: this.pensum.pensum_id};
    console.log(data);
    this.httpService.put(data, '/SubjectPensum').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
      } else {
        console.log(res.message);
      }
      this.done.pop();
    });
  }

  getSubjects() {
    return new Promise ((resolve, reject) => {
        // LISTAR TODAS LAS MATERIAS
        this.httpService.get('/Subjects?id=' + this.pensum.faculty_id).subscribe((res: any) => {
          if (res.status === 200) {
            this.typesSubjectPensum = res.types;
            console.log(this.typesSubjectPensum);
            resolve(res.subjects);
          } else {
            reject(res.response);
          }
        });
    });
  }

  getSubjectPensum() {
    return new Promise ((resolve, reject) => {
    this.getSubjects().then((data: any) => {
        // LISTAR MATERIAS EN PENSUM
          this.httpService.get('/SubjectPensum?id=' + this.pensum.pensum_id).subscribe((res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.done[0] = res.subjectRestriction;
              for (let i = 0; i < res.pensumSubjects.length; i++) {
                if (res.pensumSubjects[i].type_subject_pensum_id === 1) {
                this.done[res.pensumSubjects[i].term].push(res.pensumSubjects[i]);
                } else {
                  this.electives.push(res.pensumSubjects[i]);
                }
                const remove = data.findIndex((subject) =>{
                  console.log(subject.subject_id, res.pensumSubjects[i].subject_id);
                  return subject.subject_id === res.pensumSubjects[i].subject_id;
                });
                data.splice(remove, 1)
                //data.splice(data.indexOf(res.pensumSubjects[i]), 1);
              }
              if (res.pensumSubjects.length > 0) {
                this.new = false;
                console.log(this.new);
              }
              resolve(data);
            } else {
              reject(res.response);
            }
          });
        }).catch(error => console.log(error));
    });
  }

  drawRestrictions(done) {
    console.log(done);
    for (let i = 0; i < done[0].length; i++) {
      this.source = done[0][i].subject_id_source_restriction.toString();
      this.target = done[0][i].subject_id_target_restriction.toString();
      console.log(this.source, this.target, document.getElementById(this.source));
      this.connectSourceToTargetUsingJSPlumb(this.source, this.target);
    }
    return '';
  }

  ngOnInit() {
    console.log(this.activeRouter.queryParams);
    this.activeRouter.queryParams.subscribe(params => {
      console.log(params);
        this.pensum = JSON.parse(params['pensum']);
    });
    this.getSubjectPensum().then((data: any) => {
      this.subjects = data;
      const $this = this;
      setTimeout(function() {$this.drawRestrictions($this.done); }, 2000);
      this.source = '';
      this.target = '';
      console.log(this.done);
    }).catch(error => console.log(error));
  }
}
