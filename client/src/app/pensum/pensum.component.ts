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
  showConnectionToggle = false;
  buttonName = 'Connect';

  subjects: Subject[];
  typesSubjectPensum;
  showFiller = false;
  pensum: Pensum;
  done = [[], [], [], [], []];

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private activeRouter: ActivatedRoute, private httpService: HttpService) {}

   ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
   }

   showConnectOnClick() {
    this.showConnectionToggle = ! this.showConnectionToggle;
    if ( this.showConnectionToggle) {
    this.buttonName = 'Dissconnect';
      this.connectSourceToTargetUsingJSPlumb();
    } else {
      this.buttonName = 'Connect';
      this.jsPlumbInstance.reset();

      // var conn = this.jsPlumbInstance.connect({source:"element1", target:"element2"});
      // this.jsPlumbInstance.remove("element1");

      // var conn = this.jsPlumbInstance.connect({source:"element1", target:"element2"});
      // this.jsPlumbInstance.detach(conn);
    }
  }



  connectSourceToTargetUsingJSPlumb() {
    // let labelName;
    //   labelName = 'connection';
      this.jsPlumbInstance.connect({
        connector: ['Flowchart', {stub: [10, 10], cornerRadius: 4, alwaysRespectStubs: true}],
        endpointStyle: {fill: 'transparent'},
        source: 'Source',
        target: 'Target1',
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#456', strokeWidth: 2},
      });
  }

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
