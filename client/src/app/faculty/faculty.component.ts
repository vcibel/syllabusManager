import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Faculty } from '../models/faculty';
import { HttpService } from '../service/http/http.service';
import { AlertService } from '../service/alert/alert.service';

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

  constructor(public dialogRef: MatDialogRef<FacultyComponent>, private httpService: HttpService,
              private alertService: AlertService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.faculty = this.dialogRef._containerInstance._config.data;
      this.new = false;
    }
    console.log(this.faculty);
    console.log(this.new);
  }

  alertError() {
    this.alertService.confirm('Error', 'Error!')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  createFaculty() {
    console.log(this.faculty);
    this.faculty.faculty_code = Number(this.faculty.faculty_code);
      this.httpService.post(this.faculty, '/Faculties').subscribe((res: any) => {
          if (res.status === 200) {
            this.alertService.confirm('', 'Facultad creada');
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
            //alert(res.response);
            this.alertService.confirm('Error', res.response);
            //this.alertService.confirm('Error', 'Ingrese los datos indicados');
          }
      });
  }

  updateFaculty() {
    this.httpService.put(this.faculty, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.confirm(' ', 'Facultad editada');
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
        //alert(res.response);
        this.alertService.confirm('Error!', res.response);
      }
    });
  }

  onClose(faculty) {
    this.dialogRef.close(faculty);
  }

  ngOnInit() {
  }
}
