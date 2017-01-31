import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';


import { LoginPM } from '../../PM/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private loginPM: LoginPM) {
      // this.form = loginPM.form;
  }

  ngOnInit() {
  }

}
