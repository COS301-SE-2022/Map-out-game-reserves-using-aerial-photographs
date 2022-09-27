import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'aerial-mapping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<any>(); //for unit testing purposes

  title = 'login-component';

  loginForm: UntypedFormGroup;
  isSubmitted: boolean;
  inAnimation: boolean;
  hide: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router ) {
    //loader

    this.inAnimation = false;

    this.fadeOut();

    this.loginForm = this.formBuilder.group({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    });
    this.isSubmitted = false;

    this.hide = true;
  }

  windowReload() {
    window.location.reload();
  }

  //signs the user in and creates a token for them
  async login() {
    if (this.isSubmitted) {
      const email = this.loginForm.controls['email'];
      const password = this.loginForm.controls['password'];

      if (email.value != '' && password.value != '') {
        //Amplify Auth
        try {
          const user = await Auth.signIn(email.value, password.value);
          this.router.navigate(['dashboard']);
          setTimeout(() => {
            this.windowReload();
          }, 1);
          this.loggedIn.emit(user); //for unit testing purposes
        } catch (error) {
          console.log('error signing in', error);
          this.errorOccurred('' + error);
          this.isSubmitted = false;
        }
      }
    }
  }

  //returns the error message from logging in to the user
  errorOccurred(err: string) {
    if (err != '') {
      if (err.includes('User does not exist')) {
        if (document.getElementById('error')) {
          //for testing purposes
          document.getElementById('error')!.innerHTML =
            'Either the email or password entered is incorrect';
        }
      }
    }
  }

  //gets the user email from the form
  get email() {
    return this.loginForm.get('email');
  }

  //gets the user password from the form
  get password() {
    return this.loginForm.get('password');
  }

  //closes the loader
  fadeOut() {
    if (!this.inAnimation) {
      this.inAnimation = true;
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          const loader = document.getElementById('pre-loader');
          loader!.setAttribute('class', 'fade-out');
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
    }
  }
}
