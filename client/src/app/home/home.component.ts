import { Subject } from './../models/subject';
import { HttpService } from '../service/http.service';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeSubject } from '../models/type_subjet';
import * as $ from 'jquery';
import { MDBModalService, ModalDirective } from 'angular-bootstrap-md';
import { MatDialog, MatDialogConfig} from '@angular/material';


export interface Section {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
 
  panelOpenState = false;
  isRegister: boolean  = false;
  isCollege: boolean  = false;
  isFaculty: boolean  = false;
  isSubject: boolean  = false;
  isDepartment: boolean  = false;
  Show: boolean = false;

  showCollege: boolean = true;
  closeResult: string;

  subjects: Subject[];
  departmentSubjects: Subject[];

  constructor(private router: Router, private modalService: NgbModal, private httpService: HttpService,
    private dialog: MatDialog ) { }

    menu: Section[] = [
      { name: 'College'},
      { name: 'Subject'},
      { name: 'Deparment'},
      { name: 'Faculties'},
      { name: 'Pensum'},
      { name: 'Register'},
    ];

  ngOnInit() {
  }

  logout() {
    this.httpService.get('/Logout').subscribe((res: any) => {
      if (res.status === 200 || 400) {
          this.router.navigateByUrl('/');
      }
    });
  }

  getDepartmentSubjects() {
    this.departmentSubjects = this.subjects.filter(function(subject: Subject) {
                                                        return subject.department_id === this.department_selected.department_id;
                                                      });
    console.log(this.departmentSubjects);
  }

  toggleRegister() {
    if (this.isRegister) {
      this.isRegister = false;
    } else {
      this.isRegister = true;
    }
  }

  toggleColleges() {
    if (this.isCollege) {
      this.isCollege = false;
    } else {
      this.isCollege = true;
    }
  }

  toggleFaculties() {
    if (this.isFaculty) {
      this.isFaculty = false;
    } else {
      this.isFaculty = true;
    }
  }

  toggleSubjects() {
    if (this.isSubject) {
      this.isSubject = false;
    } else {
      this.isSubject = true;
    }
  }

  toggleDepartments() {
    if (this.isDepartment) {
      this.isDepartment = false;
    } else {
      this.isDepartment = true;
    }
  }

}
