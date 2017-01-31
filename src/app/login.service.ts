import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserForm } from './shared/user';

@Injectable()
export class LoginService {
  url_server: string = 'http://dev69.local/api/ng-simplyon-eleves/login/';

  constructor(private http: Http) {

  }

  checkUser(form: UserForm): Observable<Response> {
    let body = `username=${form.username}&password=${form.password}`;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post(this.url_server, body, options);
  }

}
