import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Universidad Rafael Urdaneta';

  constructor(private router: Router) { 

  }

  login() {
    this.router.navigateByUrl('/home');
  };

  ngOnInit() {
  }

}
