import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  @Input() done;
  @Output() clicked = new EventEmitter<any>();
  @Output() droped = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<[]>) {
      this.droped.emit(event);
  }

  onClick(event) {
      this.clicked.emit(event);
  }

}
