import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreatePensumComponent } from '../create-pensum/create-pensum.component';
import { jsPlumb } from 'jsplumb';

export interface Section {
  hc: number;
  name:string;
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

  showFiller = false;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private dialog: MatDialog) {}

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
        endpointStyle:{fill:'transparent'},
        source: 'Source',
        target: 'Target1',
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#456', strokeWidth: 2},
      });  
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  todo: Section[] = [
    { code: '201T18', hc:2, name:'Fisica', id: 'Target1'},
    { code: '201T18', hc:3, name:'Matematica', id: 'Target1'},
    { code: '201T18', hc:5, name:'Qumica', id: 'Target1'},
    { code: '201T18', hc:6, name:'Algebra', id: 'Target1'},
    { code: '201T18', hc:3, name:'Geometria', id: 'Target1'},
    { code: '201T18', hc:2, name:'Matematica', id: 'Target1'},
  ];

  done: Section[] = [
    { code: '201T18', hc:2, name:'Matematica', id: 'Source'},
    { code: '201T18', hc:3, name:'Matematica', id: 'Source'},
    { code: '201T18', hc:5, name:'Matematica', id: 'Target1'},
    { code: '201T18', hc:6, name:'Matematica', id: 'Source'},
    { code: '201T18', hc:3, name:'Matematica', id: 'Target1'},
    { code: '201T18', hc:2, name:'Matematica', id: 'Source'},
  ];

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

  ngOnInit() {
  }

}
