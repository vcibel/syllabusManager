import { HttpService } from '../service/http/http.service';
import { College } from './../models/college';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CollegeComponent } from '../college/college.component';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {

  colleges: College[];

  constructor(private dialog: MatDialog, private httpService: HttpService) { }

  openCollege(college) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = college;
    this.dialog.open(CollegeComponent, dialogConfig);
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

  deleteCollege(college) {
    this.httpService.delete(college.college_id, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.colleges.splice(this.colleges.indexOf(college), 1);
      } else {
        alert(res.response);
      }
    });
  }

}
