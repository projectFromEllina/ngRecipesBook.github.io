import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  char = 6;
  success;
  create;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser();
    console.log();

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, this.checkPass.bind(this)])
    });
  }

  checkPass(control: FormControl) {
    if (control.value.length < this.char) {
      return {'lenghtError': true};
    }
    return null;
  }

  onSignup() {
    const newUser = this.form.value;

    this.authService.signupUser(newUser, newUser.email);
    this.success = this.authService.onLogin();
    this.create = this.authService.onCreate();
  }
}
