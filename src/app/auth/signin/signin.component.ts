import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  char = 6;
  validUser = false;
  login;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser();

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

  onSignin() {
    const email = `${this.form.value.email}`;
    const password =  `${this.form.value.password}`;
    this.authService.signin(email, password);
    this.login = this.authService.onLogin();
    if (!this.login) {
      this.validUser = true;
    }
  }

}
