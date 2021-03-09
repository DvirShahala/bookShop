import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserAttr } from '../../models/interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  EMAIL_REGEX_VALIDATION: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formGroup: FormGroup;
  hide: boolean = true;
  userDetails: UserAttr;
  invalidErrorMsg: String = '';

  constructor(private formBuilder: FormBuilder,
    private signUpService: AuthService,
    private router: Router) { }

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
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Email is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Password is required' :
      this.formGroup.get('password').hasError('requirements') ? 'Password must be between 6 and 20 characters' : '';
  }

  async onSubmit(userDetails: UserAttr) {
    try {
      const user = await this.signUpService.createAccount(userDetails);
      this.invalidErrorMsg = "The user was successfully created";
      this.router.navigate(['/login']);
    } catch (err) {
      console.error(err);
      err.error.errors.forEach(errMsg => {
        this.invalidErrorMsg = errMsg.message;
      });
    }
  }
}
