import { Faculty } from './../models/faculty';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MDBModalService, MDBModalRef, ModalDirective } from 'angular-bootstrap-md';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material';
import { HttpService } from '../service/http.service';
import { College } from '../models/college';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  college: College = {
    college_id: null,
    college_code: null,
    name: '',
    faculty_id: null,
    faculty_code: null,
    created_at: '',
    updated_at: '',
    college_image: ''
  };
  new: boolean = true;
  faculties: Faculty[];

  constructor(public dialogRef: MatDialogRef<CollegeComponent>, private httpService: HttpService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
        this.college = this.dialogRef._containerInstance._config.data;
        this.new = false;
    }
    console.log(this.college);
    console.log(this.new);
  }

  createCollege() {
    console.log(this.college);
    this.httpService.post(this.college, '/Colleges').subscribe((res: any) => {
        if (res.status === 200) {
          this.onClose();
          console.log(res);
          this.college = {
            college_id: null,
            college_code: null,
            name: '',
            faculty_id: null,
            faculty_code: null,
            created_at: '',
            updated_at: '',
            college_image: ''
          };
        } else {
          alert(res.response);
        }
    });
  }

  updateCollege() {
    this.httpService.put(this.college, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.onClose();
        this.college = {
          college_id: null,
          college_code: null,
          name: '',
          faculty_id: null,
          faculty_code: null,
          created_at: '',
          updated_at: '',
          college_image: ''
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
    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        alert(res.response);
      }
    });
  }

}