import { AttendanceStudentPM } from './../../PM/attendance-student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-student',
  templateUrl: './attendance-student.component.html'
})
export class AttendanceStudentComponent implements OnInit {

  constructor(public asPM: AttendanceStudentPM) { }

  ngOnInit() {
  }

}
