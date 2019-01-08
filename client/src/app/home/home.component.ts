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

  constructor(private router: Router, private modalService: NgbModal ) { }

  menu: Section[] = [
    {name: 'Inicio', component: '/home', func:'open(content)'},
    {name: 'Crear Carrera', component: '/signup', func:'logout()' },
    {name: 'Crear Pensum', component: 'LoginComponent', func: 'logout()'},
    {name: 'Crear Materia', component: 'LoginComponent', func: 'logout()'},
  ];

  logout() {
    this.router.navigateByUrl('/');
  };

  openPage(page) {
    this.router.navigateByUrl(page.component);
    console.log('do iit')
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

  ngOnInit() {
  }

}
