import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  studentForm: any = {};
  showForm: boolean = false;
  formTitle: string = 'Create New Student';
  formBtnText: string = 'Create';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: any) => {
        this.students = data.students;
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  createStudent(): void {
    this.studentForm = {};
    this.formTitle = 'Create New Student';
    this.formBtnText = 'Create';
    this.showForm = true;
  }

  submitForm(): void {
    if (this.formBtnText === 'Create') {
      this.studentService.createStudent(this.studentForm).subscribe(
        (response: any) => {
          console.log('Student created:', response);
          this.getStudents(); // Refresh student list
          this.showForm = false;
        },
        (error: any) => {
          console.error('Error creating student:', error);
        }
      );
    } else {
      const studentId = this.studentForm.id;
      delete this.studentForm.id; // Remove ID from payload
      this.studentService.updateStudent(studentId, this.studentForm).subscribe(
        (response: any) => {
          console.log('Student updated:', response);
          this.getStudents(); // Refresh student list
          this.showForm = false;
        },
        (error: any) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }

  updateStudent(student: any): void {
    this.studentForm = { ...student };
    this.formTitle = 'Update Student';
    this.formBtnText = 'Update';
    this.showForm = true;
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe(
        (response: any) => {
          console.log('Student deleted:', response);
          this.getStudents(); // Refresh student list
        },
        (error: any) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }
}
