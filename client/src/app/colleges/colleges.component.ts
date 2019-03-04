import { Faculty } from './../models/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../service/http/http.service';
import { College } from './../models/college';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CollegeComponent } from '../college/college.component';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {

  colleges: College[];
  faculty: Faculty;
  tittle = '';
  admin = false;

  constructor(private dialog: MatDialog, private httpService: HttpService, private router: Router,
              private activeRouter: ActivatedRoute, private userService: UserService) { }

  goToDepartments(college) {
    this.router.navigate(['departments'], {queryParams: {college: JSON.stringify(college)}});
  }

  openCollege(college) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = college;
    const dialogRef = this.dialog.open(CollegeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.colleges.push(result);
      }
  });
  }

  ngOnInit() {
    if (this.userService.user.type_user_id === 1) {
      this.admin = true;
    }
    console.log(this.activeRouter.queryParams);
    this.activeRouter.queryParams.subscribe(params => {
        console.log(params);
        this.faculty = JSON.parse(params['faculty']);
    });
    console.log(this.faculty);
    if (this.faculty === undefined) {
      this.tittle = 'ESCUELAS';
        // LISTAR ESCUELAS
        this.httpService.get('/Colleges').subscribe((res: any) => {
          if (res.status === 200) {
            this.colleges = res.colleges;
            console.log(this.colleges);
          } else {
            alert(res.response);
          }
        });
    } else {
      this.tittle = this.faculty.faculty_name;
        // LISTAR ESCUELAS DE FACULTAD
        this.httpService.get('/Colleges?id=' + this.faculty.faculty_id).subscribe((res: any) => {
          if (res.status === 200) {
            this.colleges = res.colleges;
            console.log(this.colleges);
          } else {
            alert(res.response);
          }
        });
    }
  }

  deleteCollege(college) {
    this.httpService.delete(college.college_id, '/Colleges').subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res.response);
        this.colleges.splice(this.colleges.indexOf(college), 1);
      } else {
        alert(res.response);
      }
    });
  }

}
