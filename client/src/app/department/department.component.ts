import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Department } from '../models/department';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  department: Department = {
    department_id: null,
    department_code: null,
    description: '',
    college_id: null,
    created_at: null,
    updated_at: null
};

  constructor(private httpService: HttpService, public dialogRef: MatDialogRef<DepartmentComponent>) { }

  createDepartment() {
    this.httpService.post(this.department, '/Departments').subscribe((res: any) => {
        if (res.status === 200) {
         this.onClose();
          console.log(res);
        } else {
          alert(res.response);
        }
    });
  }

  onClose(){
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
