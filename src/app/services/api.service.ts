import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {
  url_server: string = 'http://dev69.local/api/ng-simplyon-admin/';

  constructor(private http: Http) {

  }

  getStudentsPresentToday(): Observable<Response> {
    // return this.http.get(this.url_server + 'json/mock-get-student-list-day.json');
    return this.http.get('http://simplyon.local/admin/get/signature/today');
  }

  getAllStudents(param): Observable<Response> {
    // return this.http.get(this.url_server + 'json/mock-get-all-students.json');
    if(param === 'sym') {
      return this.http.get('http://simplyon.local/admin/get/all-students');
    }
    if(param === 'local') {
      return this.http.get(this.url_server + 'json/mock-get-all-students.json');
    }
  }

  getPresence(year: string,
  month: string,
  studend_id: string): Observable<Response> {
    try {
      return this.http.get(this.url_server + 'json/' + `mock-get-presence-${year}-${month}-student-${studend_id}`);
    } catch (error) { console.log('Error: ', error); }
  }
}
