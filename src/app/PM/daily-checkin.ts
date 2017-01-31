import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ApiService } from '../services/api.service';

export class Student {
  id: string;
  nom: string;
  prenom: string;
  matin: string;
  apres_midi: string;
}

@Injectable()
export class DailyCheckinPM {
  students_present;

  constructor(private apiService: ApiService) {
    // console.log('Start EtudiantsPresentPM');
    apiService.getStudentsPresentToday().subscribe(
      (res: Response) => {
        console.log('Student Present: ', res.json());

        let signatures: Object[] = res.json()['signatures'];
        let students: Object[] = res.json()['students'];
            students = students.map( (s) => {
              for (let i = 0; i < signatures.length; i++) {
                let element = signatures[i];
                if (element['student_id'] === s['id']) {
                  s['signatures_id'] = element['id'];
                  s['date'] = element['date'];
                  s['matin'] = element['matin'];
                  s['apres_midi'] = element['apres_midi'];
                  // console.log(s);
              } /*else {
                  s['signatures_id'] = element['id'];
                  s['date'] = element['date'];
                  s['matin'] = element['matin'];
                  s['apres_midi'] = element['apres_midi'];
                  console.log(s);
                }*/
              }
              return s;
            });
            console.log(students);
        this.students_present = students;

        /*
        this.students_present = this.filterByPresent(res.json());
        console.log(this.students_present);
        */
      });
  }

  filterByPresent(students: Student[]): Student[] {
    let absent_journee = [];
    let absent_demijournee = [];
    let present = [];

    for (let index = 0; index < students.length; index++) {
      let student = students[index];
      if (student.matin === '0' && student.apres_midi === '0') {
        absent_journee.push(student);
      } else if (student.matin === '0' || student.apres_midi === '0') {
        absent_demijournee.push(student);
      } else { present.push(student); }
    }

    return absent_journee.concat(absent_demijournee, present);
  }

}
