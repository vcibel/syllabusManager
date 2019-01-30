import { College } from './../models/college';
import { HttpService } from './../service/http/http.service';
import { Faculty } from './../models/faculty';
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
    pensum_date: null,
  };
  colleges: College[];

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<CreatePensumComponent>) { }

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
    this.httpService.post(this.pensum, '/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
          console.log(res);
          this.onClose();
          this.pensum = {
            pensum_id: null,
            college_id: null,
            pensum_date: null,
        };
          alert(res.response);
      } else {
        console.log(res.message);
      }
    });
  }

}
