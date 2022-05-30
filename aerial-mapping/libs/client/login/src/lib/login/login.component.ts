import { Component } from '@angular/core';
import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'aerial-mapping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(private apiService:ClientApiService, private router: Router, private http: HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.isSubmitted = false;
  }

  login() {
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];

    this.apiService.login(email.value, password.value).subscribe((response) => {
      this.isSubmitted = true;
      document.cookie = "jwt=" + response.data.login + "; path=/";
      this.router.navigate(['dashboard']);
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
