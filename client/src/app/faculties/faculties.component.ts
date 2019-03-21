import { Router } from '@angular/router';
import { Faculty } from './../models/faculty';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FacultyComponent } from '../faculty/faculty.component';
import { UserService } from '../service/user/user.service';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FacultiesComponent implements OnInit {

  faculties: Faculty[];
  admin = false;
  showLoadder: boolean = true;
  found: boolean = true;

  constructor(private dialog: MatDialog, private httpService: HttpService, private router: Router,
              private userService: UserService, private alertService: AlertService) { }

  goToColleges(faculty) {
    this.router.navigate(['colleges'], {queryParams: {faculty: JSON.stringify(faculty)}});
  }

  openFaculty(faculty) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = faculty;
    const dialogRef = this.dialog.open(FacultyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        if (result !== undefined) {
          this.faculties.push(result);
        }
    });
  }

  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }

    // LISTAR FACULTADES
    this.httpService.get('/Faculties').subscribe((res: any) => {
      this.showLoadder = false;
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
        if(this.faculties.length == 0){
          this.found = false;
        } else {
          this.found = true;
        }
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

  deleteFaculty(faculty) {
    this.httpService.delete(faculty.faculty_id, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.open('Facultad eliminada');
        console.log(res.response);
        this.faculties.splice(this.faculties.indexOf(faculty), 1);
      } else {
        this.alertService.confirm('Error', res.response);
      }
    });
  }

}
