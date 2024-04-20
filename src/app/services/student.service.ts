import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://example.com/api'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  // Method to fetch all students
  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  // Method to get student by ID
  getStudentById(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${studentId}`);
  }

  // Method to create a new student
  createStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, studentData);
  }

  // Method to update an existing student
  updateStudent(studentId: number, studentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/${studentId}`, studentData);
  }

  // Method to delete a student
  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${studentId}`);
  }
}


