import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreatePensumComponent } from '../create-pensum/create-pensum.component';

export interface Section {
  hc: number;
  name:string;
  code: string;
}

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

export class PensumComponent implements OnInit {

  showFiller = false;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(private router: Router, private dialog: MatDialog) { }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

  todo: Section[] = [
    { code: '201T18', hc:2, name:'Fisica'},
    { code: '201T18', hc:3, name:'Matematica'},
    { code: '201T18', hc:5, name:'Qumica'},
    { code: '201T18', hc:6, name:'Algebra'},
    { code: '201T18', hc:3, name:'Geometria'},
    { code: '201T18', hc:2, name:'Matematica'},
  ];

  done: Section[] = [
    { code: '201T18', hc:2, name:'Matematica'},
    { code: '201T18', hc:3, name:'Matematica'},
    { code: '201T18', hc:5, name:'Matematica'},
    { code: '201T18', hc:6, name:'Matematica'},
    { code: '201T18', hc:3, name:'Matematica'},
    { code: '201T18', hc:2, name:'Matematica'},
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
