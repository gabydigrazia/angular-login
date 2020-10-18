import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginData, ResponseLoginData } from '../_models/login-data';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: LoginData = {
    Username : null,
    Password: null
  };

  submitted = false;
  hide = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  signIn() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginData.Username = this.loginForm.value.user;
      this.loginData.Password = this.loginForm.value.password;

      this.authService.login(JSON.stringify(this.loginData)).subscribe((data: ResponseLoginData) => {
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['/summary']);
      });
    }
  }
}
