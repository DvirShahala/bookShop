import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserAttr, UserDoc } from '../../models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  EMAIL_REGEX_VALIDATION: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formGroup: FormGroup;
  hide: boolean = true;
  invalidErrorMsg: String = '';
  @Output() isLogin = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
    private loginService: AuthService,
    private rouetr: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(this.EMAIL_REGEX_VALIDATION)]],
      'password': [null, [Validators.required, this.checkLengthPassword]],
    });
  }

  checkLengthPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^.{6,20}$/;
    return (!(passwordCheck.test(enteredPassword)) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Email is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Password is required' :
      this.formGroup.get('password').hasError('requirements') ? 'Password must be between 6 and 20 characters' : '';
  }

  // async onSubmit(userDetails: UserAttr) {
  //   await this.loginService.checkAuthenticated(userDetails)
  //     .then((user: UserDoc) => {
  //       localStorage.setItem('userId', user.id);
  //       localStorage.setItem('admin', String(user.admin));
  //       this.rouetr.navigate(['regularPage']);
  //     })
  //     .catch(err => {
  //       console.error(err);

  //       err.error.errors.forEach(errMsg => {
  //         this.invalidErrorMsg = errMsg.message;
  //       });
  //     })
  // }

  async onSubmit(userDetails: UserAttr) {
    try {
      const user = await this.loginService.checkAuthenticated(userDetails);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('admin', String(user.admin));
      this.rouetr.navigate(['regularPage']);
    } catch (err) {
      console.error(err);
      err.error.errors.forEach(errMsg => {
        this.invalidErrorMsg = errMsg.message;
      });
    }
  }
}
