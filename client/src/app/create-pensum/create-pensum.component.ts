import { Router } from '@angular/router';
import { College } from './../models/college';
import { HttpService } from './../service/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Pensum } from '../models/pensum';

@Component({
  selector: 'app-create-pensum',
  templateUrl: './create-pensum.component.html',
  styleUrls: ['./create-pensum.component.scss']
})
export class CreatePensumComponent implements OnInit {

  pensum: Pensum = {
    pensum_id: null,
    college_id: null,
    college_name: '',
    faculty_id: null,
    faculty_name: '',
    pensum_date: null,
  };
  colleges: College[];

  constructor(private router: Router, private httpService: HttpService, public dialogRef: MatDialogRef<CreatePensumComponent>) { }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {
    // LISTAR ESCUELAS
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        alert(res.response);
      }
    });
  }

  createPensum() {
    console.log(this.pensum);
    this.httpService.post(this.pensum, '/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
          this.onClose();
          this.pensum.pensum_id = res.pensum_id;
          this.router.navigate(['pensum'], {queryParams: {pensum: this.pensum}});
      } else {
        console.log(res.message);
      }
    });
  }

}
