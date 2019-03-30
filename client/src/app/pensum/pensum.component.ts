import { Pensum } from './../models/pensum';
import { HttpService } from './../service/http/http.service';
import { Subject } from './../models/subject';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';

import * as  _moment from 'moment';
import { default as _rollupMoment} from 'moment';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDialogConfig, MatDialog } from '@angular/material';
import { UserService } from '../service/user/user.service';
import { SubjectComponent } from '../subject/subject.component';
import { AlertService } from '../service/alert/alert.service';

const moment = _rollupMoment || _moment;

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
  showLoadder: boolean = true;
  found: boolean = true;

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
  edit = false;
  open = false;
  admin = false;
  searchResult: Subject[];
  input: String;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private activeRouter: ActivatedRoute, private httpService: HttpService,
              private userService: UserService, private dialog: MatDialog, private alertService: AlertService) {}

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
    console.log(event);
    if (!this.edit) {
    if (this.add) {
      if (this.source === '') {
        this.source = event.subject_id.toString();
        this.restriction.subject_id_source_restriction = this.source;
      } else {
        this.target = event.subject_id.toString();
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
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.data = event;
      const dialogRef = this.dialog.open(SubjectComponent, dialogConfig);
    }
    console.log(event, this.source, this.target);
    console.log(this.done);
  }

  connectSourceToTargetUsingJSPlumb(source, target) {
    // let labelName;
    //   labelName = 'connection';
    const conn = this.jsPlumbInstance.connect({
        connector: ['Flowchart', {stub: [9, 9], cornerRadius: 0, alwaysRespectStubs: true}],
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

  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const arrayString = event.container.id.split('-');
      const term = event.term;
      // Number(arrayString[arrayString.length - 1]) + 1;
      console.log(arrayString, arrayString[arrayString.length - 1]);
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

  setDate(event) {
    console.log(event);
    this.pensum.pensum_date = event.value;
  }

  save() {
      if (this.new) {
        this.createPensum();
      } else {
        this.updatePensum();
      }
      console.log(this.pensum);
      this.httpService.put(this.pensum, '/Pensum').subscribe((res: any) => {
        if (res.status === 200) {
            this.alertService.open('Guardado con exito!');
            console.log(res);
            this.edit = true;
        } else {
          console.log(res.message);
          this.alertService.confirm('Error', res.message);
        }
      });
  }

  createPensum() {
    this.done['11'] = this.electives;
    const data = {data: this.done, pensum_id: this.pensum.pensum_id};
    console.log(data);
    this.httpService.post(data, '/SubjectPensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Pensum creado!');
        console.log(res);
      } else {
        console.log(res.message);
        this.alertService.confirm('Error', res.message);
      }
    });
  }

  updatePensum() {
    this.done['11'] = this.electives;
    const data = {data: this.done, pensum_id: this.pensum.pensum_id};
    console.log(data);
    this.httpService.put(data, '/SubjectPensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Pensum editado!');
        console.log(res);
      } else {
        this.alertService.confirm('Error', 'error');
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
            console.log(res.subjects);
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
                const remove = data.findIndex((subject) => {
                  console.log(subject.subject_id, res.pensumSubjects[i].subject_id);
                  return subject.subject_id === res.pensumSubjects[i].subject_id;
                });
                console.log(remove);
                data.splice(remove, 1);
                console.log(remove, data);
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

  search(input) {
    this.searchResult = [];
    console.log(input);
    var value = input !== '';
    if (input !== '') {
    this.subjects.filter((subject: Subject) => {
          if (subject.subject_name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            this.searchResult.push(subject);
          } else if (subject.subject_code.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            this.searchResult.push(subject);
          }
        });
    } else {
      this.searchResult = this.subjects;
    }

    if (value == true && this.searchResult.length == 0){
      console.log('not found');
      this.found = false;
    } else{
      this.found = true;
    }

    console.log(this.searchResult);
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

  /*hideList() {
    this.edit=!this.edit;
    this.jsPlumbInstance.deleteEveryConnection();
    this.jsPlumbInstance.repaintEverything();
    // this.jsPlumbInstance.deleteEveryConnection();
    //this.jsPlumbInstance.deleteEveryConnection();
    const $this = this;
    setTimeout(function() {$this.jsPlumbInstance.repaintEverything(); }, 10000)
    // setTimeout(function() {$this.drawRestrictions($this.done); }, 20000);
  }*/

  ngOnInit() {

    if(this.edit == false){
      this.edit = true;
      // this.open = true;
    }

    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }
    console.log(this.activeRouter.queryParams);
    this.activeRouter.queryParams.subscribe(params => {
      console.log(params);
      //this.showLoadder = false;
      this.pensum = JSON.parse(params['pensum']);
    });
    if (this.pensum.pensum_date === undefined) {
      this.pensum.pensum_date = '';
    }
    console.log(this.pensum);
    this.getSubjectPensum().then((data: any) => {
      this.showLoadder = false;
      this.subjects = data;
      this.searchResult = data;
      console.log(data);
      const $this = this;
      setTimeout(function() {$this.drawRestrictions($this.done); }, 2000);
      // setTimeout(function() {$this.showLoadder = false; }, 3000);
      this.source = '';
      this.target = '';
      console.log(this.done);
    }).catch(error => console.log(error));
  }
}
