import { Subject } from './../models/subject';
import { Career } from '../models/career';
import { Department } from './../models/department';
import { College } from './../models/college';
import { HttpService } from '../service/http.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Section {
  name: string;
  component: string;
  func: any;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showCareer: boolean = true;
  closeResult: string;
college: College = {
    college_id: null,
    college_code: null,
    description: '',
    created_at: '',
    updated_at: ''
  };
  department: Department = {
    department_id: null,
    department_code: null,
    description: '',
    career_id: null,
    created_at: null,
    updated_at: null
};
career: Career = {
  career_id: null,
  career_code: null,
  name: '',
  number_of_terms: null,
  college_id: null,
  created_at: '',
  updated_at: '',
  career_image: ''
};
subject: Subject = {
  subject_id: null,
  subject_code: '',
  name: '',
  hc: null,
  type_subject_id: null,
  syllabus_name: '',
  syllabus_url: '',
  created_at: '',
};
colleges: College[];
careers: Career[];

  constructor(private router: Router, private modalService: NgbModal, private httpService: HttpService) { }

  menu: Section[] = [
    {name: 'Inicio', component: '/home', func: 'open(content)'},
    {name: 'Crear Carrera', component: '/signup', func: 'logout()' },
    {name: 'Crear Pensum', component: 'LoginComponent', func: 'logout()'},
    {name: 'Crear Materia', component: 'LoginComponent', func: 'logout()'},
  ];

  ngOnInit() {
    //LISTAR FACULTADES
    this.httpService.get('/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        this.colleges = res.colleges;
        console.log(this.colleges);
      } else {
        alert(res.response);
      }
    });
    //LISTAR CARRERAS
    this.httpService.get('/Careers').subscribe((res: any) => {
      if (res.status === 200) {
        this.careers = res.careers;
        console.log(this.careers);
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

  createCollege(modal) {
    console.log(this.college);
      this.httpService.post(this.college, '/Colleges').subscribe((res: any) => {
          if (res.status === 200) {
            modal.close('Save click');
            console.log(res);
            this.college = {
              college_id: null,
              college_code: null,
              description: '',
              created_at: '',
              updated_at: ''
            };
          } else {
            alert(res.response);
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

  createCarrer(modal) {
    console.log(this.career);
    this.httpService.post(this.career, '/Careers').subscribe((res: any) => {
        if (res.status === 200) {
          modal.close('Save click');
          console.log(res);
        } else {
          alert(res.response);
        }
    });
  }

  createSubject(modal) {
    this.httpService.post(this.subject, '/Subjects').subscribe((res: any) => {
        if (res.status === 200) {
          modal.close('Save click');
          console.log(res);
        } else {
          alert(res.response);
        }
    });
  }

  openPage(page) {
    this.router.navigateByUrl(page.component);
    console.log('do iit');
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

  openSubject(content3) {
    this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title-3'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
