import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ApiService } from './../services/api.service';

import { Week } from './../shared/mock-days';
import { Days } from './../shared/days';
import { Student } from './../shared/student';

export class Presence {
  id: string;
  apres_midi: boolean;
  date: string;
  matin: boolean;
  student_id: string;
}

@Injectable()
/**
 * name
 */
export class AttendanceStudentPM {
  students: Student;
  months: any;
  years: any;
  days: Days[];

  editable: boolean =  false;

  student_selected: string;
  month_selected: string;
  year_selected: string;

  constructor(private apiService: ApiService) {
    apiService.getAllStudents('local').subscribe( res => {
      this.students = res.json();
      console.log('Student API: ', this.students)
    } );
    this.months = [
      {id: '01', name: 'Janvier'},
      {id: '02', name: 'Février'},
      {id: '03', name: 'Mars'},
      {id: '04', name: 'Avril'},
      {id: '05', name: 'Mai'},
      {id: '06', name: 'Juin'},
      {id: '07', name: 'Juillet'},
      {id: '08', name: 'Aout'},
      {id: '09', name: 'Septembre'},
      {id: '10', name: 'Octobre'},
      {id: '11', name: 'Novembre'},
      {id: '12', name: 'Decembre'}
    ];
    // console.log(this.months)
    this.years = ['2016', '2017'];


  }

  public selectStudent(student_id: string) {
    // console.log('Change student: ', student_id);
    this.student_selected = student_id;
    if(student_id !== '10') {return false; }
    this.generateMoment( this.month_selected, this.year_selected, this.student_selected );
  }
  public selectMonth(month_id: string) {
    // console.log('Change Month', month_id);
    this.month_selected = month_id;
    this.generateMoment( this.month_selected, this.year_selected, this.student_selected );
  }
  public selectYear(year: string) {
    // console.log('Change year', year);
    this.year_selected = year;
    this.generateMoment( this.month_selected, this.year_selected, this.student_selected);
  }

  public toggleEdit() {
    this.editable = !this.editable;
  }
  public checkAll() {
    this.days.map( (day: Days) => {
      if (day.open === true) {
        day.matin = true;
        day.apres_midi = true;
      }
    });
  }

  public togglePresence(index: number, key: string) {
    if (!this.editable) {return false;}
    if (!this.days[index]['open']) {return false;}
    if (this.days[index][key]) {
      this.days[index][key] = !this.days[index][key];
    } else {
      this.days[index][key] = true;
    }
  }


  private generateMoment(month, year, student) {
    if (month && year && student) {
      this.apiService.getPresence(year, month, student).subscribe( (res: Response) => {
        // console.log('PRESENCE: ', res.json());
        let presence: Presence[] = res.json();
        // console.log('Res: ', presence);
        this.days = this.getMonths( `${year}-${month}` ).map( (day: Days) => {
          let _day = day;
          // console.log('Day: ', day.date);
          for (let i = 0; i < presence.length; i++) {
            let item = presence[i];
            // console.log('Presence: ', item.date)
            if (day.date === item.date) {
              _day['matin'] = item.matin;
              _day['apres_midi'] = item.apres_midi;
            }
          }
          return _day;
        } );
        console.log('Days: ', this.days);
      })
    }
  }
  private getMonths(year_month) {
      let ar = [];
      let start = moment(year_month , 'YYYY-MM');
      let end = moment(start).add(1, 'month');
      while ( start.isBefore(end) ) {
        ar.push( {
          num: start.format('D'),
          date: start.format('YYYY-MM-DD'),
          // day: start.format('d'),
          name: this.tractuction( start.format('dddd') ),
          month: start.format('MMM'),
          open: this.checkIsOpenDay( start.format('dddd') )
        } );
        start.add(1, 'day');
      }
      return ar;
  }
  private tractuction(_day) {
   let days =  Week.filter( (item) => (_day === item.name_en) ? item.name_fr : false );
   return days[0]['name_fr'];
  }
  private checkIsOpenDay(_day) {
    // let days =  Week.filter( (item) => (_day === item.name_en) ? item.name_fr : false );
    let days_open = Week.filter( (item) => {
      return (_day === item.name_en) ? true : false;
    } ).map(item => item.open);
    // console.log(days_open);
    return days_open[0];
  }
  private parseDate(_date: string): number[] {
      let date = _date.split('-');
      // console.log('date: ', date);
      return [
        Number(date[0]),
        Number(date[1])
            ];
  }

}
