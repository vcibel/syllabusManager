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

  constructor(public dialogRef: MatDialogRef<CollegeComponent>, private httpService: HttpService) { }

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

  onClose(){
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
