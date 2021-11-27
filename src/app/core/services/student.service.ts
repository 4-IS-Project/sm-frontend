import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  constructor(private http: HttpClient) { }

  getStudent(id: string) {
    return this.http.get<Student[]>(environment.API_SM + 'students/' + id);
}
}
