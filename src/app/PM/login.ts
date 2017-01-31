import { Injectable } from '@angular/core';

import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Response } from '@angular/http';

import { LoginService } from '../login.service';

import { User, UserForm } from '../shared/user';

@Injectable()
export class LoginPM {
  user: Object;
  date: Number = Date.now();
  form: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
  private loginService: LoginService) {
      this.form = this.formBuilder.group({
        username: 'simplyon-yacine',
        password: 'azerty69120'
      });
  }

  send(user: UserForm) {
    this.loginService.checkUser(user).subscribe( (res: Response) => {
    this.user = res.json().user;
    console.log(this.user);
  });
  }

}