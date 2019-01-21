import { Subject } from './../models/subject';
import { College } from '../models/college';
import { Department } from './../models/department';
import { Faculty } from '../models/faculty';
import { HttpService } from '../service/http.service';
import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeSubject } from '../models/type_subjet';
import * as $ from 'jquery';
import { MDBModalService, ModalDirective } from 'angular-bootstrap-md';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { SubjectComponent } from '../subject/subject.component';
import { CollegeComponent } from '../college/college.component';


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
  Show: boolean = false;  

  showCollege: boolean = true;
  closeResult: string;
faculty: Faculty = {
    faculty_id: null,
    faculty_code: null,
    description: '',
    created_at: '',
    updated_at: ''
  };
department: Department = {
    department_id: null,
    department_code: null,
    description: '',
    college_id: null,
    created_at: null,
    updated_at: null
};
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
subject: Subject = {
  subject_id: null,
  subject_code: '',
  name: '',
  hc: null,
  type_subject_id: null,
  department_id: null,
  code_consecutive: null,
  syllabus_name: '',
  syllabus_url: '',
  created_at: '',
};
type_subject_selected: TypeSubject = {
    type_subject_id: null,
    description: '',
    type_subject_code: '',
};
college_selected: College = {
  college_id: null,
  college_code: null,
  name: '',
  faculty_id: null,
  faculty_code: null,
  created_at: '',
  updated_at: '',
  college_image: ''
};
department_selected: Department = {
  department_id: null,
  department_code: null,
  description: '',
  college_id: null,
  created_at: null,
  updated_at: null
};
typesSubject: TypeSubject[];
colleges: College[];
subjects: Subject[];
departments: Department[];
collegeDepartments: Department[];
departmentSubjects: Subject[];
@ViewChildren('file') file;
files: Set<File> = new Set ;
formData: FormData = new FormData();

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
    // LISTAR DEPARTAMENTOS
    this.httpService.get('/Departments').subscribe((res: any) => {
      if (res.status === 200) {
        this.departments = res.departments;
        console.log(this.departments);
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

  createDepartment(modal) {
    this.httpService.post(this.department, '/Departments').subscribe((res: any) => {
        if (res.status === 200) {
          modal.close('Save click');
          console.log(res);
        } else {
          alert(res.response);
        }
    });
  }

  createSubject(modal) {
    if (this.subject.subject_code === '') {
      this.subject.department_id = this.department_selected.department_id;
      this.subject.type_subject_id = this.type_subject_selected.type_subject_id;
      this.subject.code_consecutive = this.departmentSubjects[this.departmentSubjects.length - 1].code_consecutive + 1;
      this.subject.subject_code = this.college_selected.faculty_code + this.college_selected.college_code +
                                  this.department_selected.department_code + this.type_subject_selected.type_subject_code;
                                  // + this.subject.code_consecutive;
    } else {
      const subject_code = this.subject.subject_code;
      console.log(subject_code, subject_code.slice(2, 3), subject_code.slice(3, 4));
      this.department_selected = this.departments.filter(function(department: Department) {
                                      return department.department_code === parseInt(subject_code.slice(2, 3), 10);
                                    })[0];
      this.subject.department_id = this.department_selected.department_id;
      this.type_subject_selected = this.typesSubject.filter(function(type_subject: TypeSubject) {
                                      return type_subject.type_subject_code === subject_code.slice(3, 4);
                                    })[0];
      console.log(this.department_selected, this.type_subject_selected);
      this.subject.type_subject_id = this.type_subject_selected.type_subject_id;
      this.subject.code_consecutive = parseInt(this.subject.subject_code.split(this.type_subject_selected.type_subject_code)[1], 10);
    }
    console.log(this.subject);
    alert (this.subject.subject_code);
    this.httpService.post(this.subject, '/Subjects').subscribe((res: any) => {
        if (res.status === 200) {
          console.log(res);
          console.log(this.files);
          this.files.forEach(file => {
            if (file != null) {
              this.formData.append('file', file, file.name);
            }
          });
          this.httpService.postFile(this.formData, `/Files?subject_id=${this.subject.subject_id}`).subscribe((response: any) => {
            if (response.status === 200) {
              modal.close('Save click');
              console.log(response);
            } else {
              alert(response.response);
            }
        });
        } else {
          alert(res.response);
        }
    });
  }

  onFilesAdded(element) {
    console.log($('.file'));
    console.log($('.file')[0].files[0]);
    console.log(element);
    console.log(element.files);
    this.files.add($('.file')[0].files[0]);
  }

  getCollegeDepartments(college_selected) {
    console.log(college_selected);
    this.collegeDepartments = this.departments.filter(function(department: Department) {
                                                        return department.college_id === college_selected.college_id;
                                                      });
    console.log(this.collegeDepartments);
  }

  getDepartmentSubjects() {
    this.departmentSubjects = this.subjects.filter(function(subject: Subject) {
                                                        return subject.department_id === this.department_selected.department_id;
                                                      });
    console.log(this.departmentSubjects);
  }

  openPage(page) {
    this.router.navigateByUrl(page.component);
    console.log('do iit');
  }

  openModal(){
    this.modalService.open(CollegeComponent);
  }

  openSubject(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(SubjectComponent, dialogConfig);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCollage(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title-2'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openDeparment(content4) {
    this.modalService.open(content4, {ariaLabelledBy: 'modal-basic-title-4'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSubject_(content3) {
    this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title-3', backdrop: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // toggle() { this.isViewable = !this.isViewable; }

  toggleRegister() { 
    if(this.isRegister)
      this.isRegister = false;
    else{
      this.isRegister = true;
    }  
  }

  toggleColleges() { 
    if(this.isCollege)
      this.isCollege = false;
    else{
      this.isCollege = true;
    }  
  }

  toggleFaculties() { 
    if(this.isFaculty)
      this.isFaculty = false;
    else{
      this.isFaculty= true;
    }  
  }

  toggleSubjects() { 
    if(this.isSubject)
      this.isSubject = false;
    else{
      this.isSubject = true;
    }  
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
