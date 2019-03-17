import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() faculty = new EventEmitter<any>();
  @Output() college = new EventEmitter<any>();
  @Output() subject = new EventEmitter<any>();
  @Output() pensum = new EventEmitter<any>();
  @Output() user = new EventEmitter<any>();
  @Output() department = new EventEmitter<any>();
  
  constructor(private router: Router) { }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  faculties(event){
    this.faculty.emit(event);
  }

  colleges(event){
    this.college.emit(event);
  }

  users(event){
    this.user.emit(event);
  }

  pensums(event){
    this.pensum.emit(event);
  }

  subjects(event){
    this.subject.emit(event);
  }

  departments(event){
    this.department.emit(event);
  }

  ngOnInit() {
  }

}
