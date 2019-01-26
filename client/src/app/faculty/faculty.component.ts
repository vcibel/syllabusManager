import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Faculty } from '../models/faculty';
import { HttpService } from '../service/http/http.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {

  faculty: Faculty = {
    faculty_id: null,
    faculty_code: null,
    faculty_name: '',
    faculty_created_at: '',
    faculty_updated_at: ''
  };
  new: boolean = true;

  constructor(public dialogRef: MatDialogRef<FacultyComponent>, private httpService: HttpService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.faculty = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.faculty);
    console.log(this.new);
  }

  createFaculty() {
    console.log(this.faculty);
      this.httpService.post(this.faculty, '/Faculties').subscribe((res: any) => {
          if (res.status === 200) {
            this.onClose(this.faculty);
            console.log(res);
            this.faculty = {
              faculty_id: null,
              faculty_code: null,
              faculty_name: '',
              faculty_created_at: '',
              faculty_updated_at: ''
            };
          } else {
            alert(res.response);
          }
      });
  }

  updateFaculty() {
    this.httpService.put(this.faculty, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.onClose(undefined);
        this.faculty = {
              faculty_id: null,
              faculty_code: null,
              faculty_name: '',
              faculty_created_at: '',
              faculty_updated_at: ''
        };
      } else {
        alert(res.response);
      }
    });
  }

  onClose(faculty) {
    this.dialogRef.close(faculty);
  }

  ngOnInit() {
  }
}
