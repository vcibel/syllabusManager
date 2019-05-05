import { Faculty } from './../models/faculty';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpService } from '../service/http/http.service';
import { College } from '../models/college';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  college: College = {
    college_id: null,
    college_code: null,
    college_name: '',
    faculty_id: null,
    faculty_code: null,
    faculty_name: '',
    college_created_at: '',
    college_updated_at: ''
  };
  new = true;
  faculties;
  faculty_selected: Faculty = {
    faculty_id: null,
    faculty_code: null,
    faculty_name: '',
    faculty_created_at: '',
    faculty_updated_at: ''
  };

  constructor(public dialogRef: MatDialogRef<CollegeComponent>, private httpService: HttpService,
              private alertService: AlertService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
        this.college = this.dialogRef._containerInstance._config.data;
        this.new = false;
    }
    console.log(this.college);
    console.log(this.new);
  }

  createCollege() {
    this.college.faculty_id=this.faculty_selected.faculty_id;
    this.college.faculty_name=this.faculty_selected.faculty_name;
    this.college.faculty_code=this.faculty_selected.faculty_code;    
    console.log(this.college);
    if (this.college.college_name === '' || this.college.college_code === null || this.college.faculty_id === undefined){
      this.alertService.confirm('Error', 'Por favor introduzca todos los campos');
    } else {
    this.httpService.post(this.college, '/Colleges').subscribe((res: any) => {
        if (res.status === 200) {
          //this.alertService.confirm('', 'Escuela creada');
          this.alertService.open('Escuela creada!');
          this.onClose(this.college);
          console.log(res);
          this.college = {
            college_id: null,
            college_code: null,
            college_name: '',
            faculty_id: null,
            faculty_code: null,
            faculty_name: '',
            college_created_at: '',
            college_updated_at: ''
          };
        } else {
         this.alertService.confirm('Error', res.response);
        }
    });
  }
  }

  updateCollege() {
    this.httpService.put(this.college, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Escuela editada!');
        console.log(res.response);
        this.onClose(undefined);
        this.college = {
          college_id: null,
          college_code: null,
          college_name: '',
          faculty_id: null,
          faculty_code: null,
          faculty_name: '',
          college_created_at: '',
          college_updated_at: ''
        };
      } else {
        //alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  onClose(college) {
    this.dialogRef.close(college);
  }

  ngOnInit() {
    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
        const $this=this;
        this.faculty_selected = this.faculties.filter(function(faculty: Faculty) {
          return faculty.faculty_id === $this.college.faculty_id;
        });
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

}
