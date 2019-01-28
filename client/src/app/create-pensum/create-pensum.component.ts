import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-pensum',
  templateUrl: './create-pensum.component.html',
  styleUrls: ['./create-pensum.component.scss']
})
export class CreatePensumComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreatePensumComponent>) { }

  createPensum(){
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
