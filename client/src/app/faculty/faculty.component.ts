import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Faculty } from '../models/faculty';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  faculty: Faculty = {
    faculty_id: null,
    faculty_code: null,
    description: '',
    created_at: '',
    updated_at: ''
  };

  constructor(public dialogRef: MatDialogRef<FacultyComponent>, private httpService: HttpService) { }

  createFaculty() {
    console.log(this.faculty);
      this.httpService.post(this.faculty, '/Faculties').subscribe((res: any) => {
          if (res.status === 200) {
            this.onClose();
            console.log(res);
            this.faculty = {
              faculty_id: null,
              faculty_code: null,
              description: '',
              created_at: '',
              updated_at: ''
            };
          } else {
            alert(res.response);
          }
      });
  }

  onClose(){
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  

}
