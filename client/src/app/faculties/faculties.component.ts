import { Router } from '@angular/router';
import { Faculty } from './../models/faculty';
import { HttpService } from '../service/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FacultyComponent } from '../faculty/faculty.component';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit {

  faculties: Faculty[];
  admin = false;

  constructor(private dialog: MatDialog, private httpService: HttpService, private router: Router,
              private userService: UserService) { }

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
      if (res.status === 200) {
        this.faculties = res.faculties;
        console.log(this.faculties);
      } else {
        alert(res.response);
      }
    });
  }

  deleteFaculty(faculty) {
    this.httpService.delete(faculty.faculty_id, '/Faculties').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.faculties.splice(this.faculties.indexOf(faculty), 1);
      } else {
        alert(res.response);
      }
    });
  }

}
