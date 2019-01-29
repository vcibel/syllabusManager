import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pensums',
  templateUrl: './pensums.component.html',
  styleUrls: ['./pensums.component.scss']
})
export class PensumsComponent implements OnInit {

  constructor(private router: Router) { }

  
  goToPensum(){
    this.router.navigateByUrl('/pensum');
  }

  ngOnInit() {
  }

}
