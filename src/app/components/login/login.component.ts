import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'aerial-mapping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<any>();  //for unit testing purposes

  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.isSubmitted = false;
  }

  async login() {
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];
    this.isSubmitted = true;

    if(email.value != '' && password.value != '') {
      //Amplify Auth
      try {
        const user = await Auth.signIn(email.value, password.value);
        this.router.navigate(['dashboard']);
        this.loggedIn.emit(user); //for unit testing purposes
      } catch (error) {
          console.log('error signing in', error);
      }
    }

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
