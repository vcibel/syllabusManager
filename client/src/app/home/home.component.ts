import { Department } from './../models/department';
import { College } from './../models/college';
import { Faculty } from './../models/faculty';
import { Subject } from './../models/subject';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { Pensum } from '../models/pensum';


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
  isUser: boolean  = false;
  isPensum: boolean  = false;
  Show: boolean = false;

  showCollege: boolean = true;
  closeResult: string;

  subjects: Subject[];
  faculties: Faculty[];
  colleges: College[];
  departments: Department[];
  pensums: Pensum[];
  searchResult: Subject[] = [];
  collegeDepartments: Department[];
  facultyColleges: College[];
  input: String;

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
    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        alert(res.response);
      }
    });
    // LISTAR ESCUELAS
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        alert(res.response);
      }
    });
    // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.departments = res.departments;
        console.log(this.departments);
      } else {
        alert(res.response);
      }
    });
    // LISTAR PENSUMS
    this.httpService.get('/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.pensums = res.pensum;
        console.log(this.pensums);
      } else {
        alert(res.response);
      }
    });
    // LISTAR MATERIAS
    this.httpService.get('/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        this.subjects = res.subjects;
        console.log(this.subjects);
      } else {
        alert(res.response);
      }
    });
  }

  logout() {
    this.httpService.get('/Logout').subscribe((res: any) => {
      if (res.status === 200 || 400) {
          this.router.navigateByUrl('/');
      }
    });
  }

  search(input) {
    this.searchResult = [];
    //const myInput = this.input;
    console.log(input);
    if (input !== '') {
    this.subjects.filter((subject: Subject) => {
          if (subject.subject_name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            this.searchResult.push(subject);
          } else if (subject.subject_code.toLowerCase().indexOf(input.toLowerCase()) > -1) {
            this.searchResult.push(subject);
          }
        });
      }
    console.log(this.searchResult);
  }

  getFacultyColleges(faculty_selected) {
    console.log(faculty_selected);
    this.facultyColleges = this.colleges.filter(function(college: College) {
                                                        return college.faculty_id === faculty_selected.faculty_id;
                                                      });
    console.log(this.facultyColleges);
    this.searchResult = this.subjects.filter(function(subject: Subject) {
                                                        return subject.faculty_id === faculty_selected.faculty_id;
                                                      });
  }

  getCollegeDepartments(college_selected) {
    console.log(college_selected);
    this.collegeDepartments = this.departments.filter(function(department: Department) {
                                                        return department.college_id === college_selected.college_id;
                                                      });
    console.log(this.collegeDepartments);
    this.searchResult = this.subjects.filter(function(subject: Subject) {
      return subject.college_id === college_selected.college_id;
    });
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

  toggleUser() {
    if (this.isUser) {
      this.isUser = false;
    } else {
      this.isUser = true;
    }
  }

  togglepPensum() {
    if (this.isPensum) {
      this.isPensum = false;
    } else {
      this.isPensum = true;
    }
  }


}
