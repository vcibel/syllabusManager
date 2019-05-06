import { SubjectComponent } from './../subject/subject.component';
import { Department } from './../models/department';
import { College } from './../models/college';
import { Faculty } from './../models/faculty';
import { Subject } from './../models/subject';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pensum } from '../models/pensum';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertService } from '../service/alert/alert.service';


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
  found = true;
  show = false;
  showCollege = true;
  closeResult: string;

  subjects: Subject[];
  faculties: Faculty[];
  colleges: College[];
  departments: Department[];
  pensums: Pensum[];
  searchResult: Subject[] = [];
  collegeDepartments: Department[];
  facultyColleges: College[];
  collegePensum: Pensum[];
  input: String;
  typesSubject;
  pensumSubjects: Subject[];
  pensumSearch = false;

  constructor(private router: Router, private httpService: HttpService, private dialog: MatDialog,
               private alertService: AlertService) { }

  ngOnInit() {
    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
    // LISTAR ESCUELAS
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
    // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.departments = res.departments;
        console.log(this.departments);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
    // LISTAR PENSUMS
    this.httpService.get('/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.pensums = res.pensum;
        console.log(this.pensums);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
    // LISTAR MATERIAS
    this.httpService.get('/Subjects').subscribe((res: any) => {
      if (res.status === 200) {
        this.subjects = res.subjects;
        this.typesSubject = res.types;
        console.log(this.subjects, this.typesSubject);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });
    // LISTAR PENSUMS
    this.httpService.get('/Pensum').subscribe((res: any) => {
      if (res.status === 200) {
        this.pensums = res.pensum;
        console.log(this.pensums);
      } else {
        // alert(res.response);
        this.alertService.confirm('Error', res.response);
      }
    });

  }

  openSubject(subject) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = subject;
    const dialogRef = this.dialog.open(SubjectComponent, dialogConfig);
  }

  search(input) {
    console.log(input);
    this.searchResult = [];
    const value = input !== '';
    console.log(value);

    if (input !== '') {
      this.subjects.filter((subject: Subject) => {
        if (subject.subject_name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
          this.searchResult.push(subject);
          this.found = true;
        } else if (subject.subject_code.toLowerCase().indexOf(input.toLowerCase()) > -1) {
          this.searchResult.push(subject);
        }
      });
    }

    if (value === true && this.searchResult.length === 0) {
      console.log('not found');
      this.found = false;
    } else {
      this.found = true;
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
      this.pensumSearch = false;
    });
    console.log(this.searchResult);

    if (this.searchResult.length === 0) {
      console.log('not found');
      this.found = false;
    } else {
      this.found = true;
    }
  }

  getCollegeDepartments(college_selected) {
    console.log('college', college_selected);
    this.collegeDepartments = this.departments.filter(function(department: Department) {
      return department.college_id === college_selected.college_id;
    });
    console.log('college depart', this.collegeDepartments);
    this.collegePensum = this.pensums.filter(function(pensum: Pensum) {
      return pensum.college_id === college_selected.college_id;
    });
    console.log('college pensum', this.collegePensum);
    this.searchResult = this.subjects.filter(function(subject: Subject) {
      return subject.college_id === college_selected.college_id;
    });
    this.pensumSearch = false;

    console.log('searchresult', this.searchResult);
    if (this.searchResult.length === 0) {
      console.log('not found');
      this.found = false;
    } else {
      this.found = true;
    }
  }

  getDepartmentSubjects(department_selected) {
    this.searchResult = this.subjects.filter(function(subject: Subject) {
      return subject.department_id === department_selected.department_id;
    });
    this.pensumSearch = false;
    console.log('searchresult', this.searchResult);
    if (this.searchResult.length === 0) {
      console.log('not found');
      this.found = false;
    } else {
      this.found = true;
    }
  }

  getPensumSubjects(pensum_selected) {
    this.httpService.get('/SubjectPensum?id=' + pensum_selected.pensum_id).subscribe((res: any) => {
      console.log(res);
      if (res.status === 200) {
        this.searchResult = res.pensumSubjects;
        this.pensumSubjects = res.pensumSubjects;
        this.pensumSearch = true;
        console.log('searchresult', this.searchResult);
        if (this.searchResult.length === 0) {
          console.log('not found');
          this.found = false;
        } else {
          this.found = true;
        }
      } else {
        console.log(res.response);
      }
    });
  }

  getPensumSubjectsByType(type_id) {
    if (type_id === 0) {
      this.searchResult = this.pensumSubjects;
    } else {
    this.searchResult = this.pensumSubjects.filter(function(subject: any) {
      console.log(type_id, subject.type_subject_pensum_id);
      return subject.type_subject_pensum_id === type_id;
    });
    }
  }

}
