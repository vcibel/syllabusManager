import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { HttpService } from '../service/http.service';
import { Subject } from '../models/subject';
import { TypeSubject } from '../models/type_subjet';
import { Department } from '../models/department';
import { College } from '../models/college';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

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
  department: Department = {
    department_id: null,
    department_code: null,
    description: '',
    college_id: null,
    created_at: null,
    updated_at: null
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
type_subject_selected: TypeSubject = {
  type_subject_id: null,
  description: '',
  type_subject_code: '',
};

departmentSubjects: Subject[];
departments: Department[];
typesSubject: TypeSubject[];
@ViewChildren('file') file;
files: Set<File> = new Set ;
formData: FormData = new FormData();

  constructor(public dialogRef: MatDialogRef<SubjectComponent>, private httpService: HttpService) { }

  
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

  onClose(){
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
