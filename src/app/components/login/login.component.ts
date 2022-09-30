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
  errState: boolean;
  inAnimation: boolean;
  hide: boolean;

  constructor(private formBuilder: UntypedFormBuilder, public router: Router) {
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
    this.errState = false;
  }

  windowReload() {
    window.location.reload();
  }

  //assigns the user a token and logs them into the app
  async login() {
    if (this.isSubmitted) {
      this.errState = false;
      if (document.getElementById('loginBtn') != null) {
        //for testing purposes
        document.getElementById('loginBtn')!.style.display = 'none';
      }

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
          return 1;
        } catch (error) {
          console.log('error signing in', error);
          this.errorOccurred('' + error);
          if (document.getElementById('loginBtn') != null) {
            //for testing purposes
            document.getElementById('loginBtn')!.style.display = 'flex';
          }
          return error;
        }
      } else {
        this.errState = true;
        if (document.getElementById('loginBtn') != null) {
          //for testing purposes
          document.getElementById('loginBtn')!.style.display = 'flex';
        }
        return 'email or password empty';
      }
    }
    return -1;
  }

  //displays the login error to the user
  errorOccurred(err: string) {
    this.isSubmitted = false;
    if (err != '') {
      if (
        err.includes('User does not exist') ||
        err.includes('Incorrect username or password')
      ) {
        if (document.getElementById('error')) {
          //for testing purposes
          document.getElementById('error')!.innerHTML =
            'Either the email or password entered is incorrect';
        }
      }
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  //closes the loadscreen
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
