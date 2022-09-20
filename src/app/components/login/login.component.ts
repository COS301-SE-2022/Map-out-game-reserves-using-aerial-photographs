import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { Auth } from 'aws-amplify';
import { ThisReceiver } from '@angular/compiler';
import { faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'aerial-mapping-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<any>();  //for unit testing purposes

  title = 'login-component';

  loginForm: UntypedFormGroup;
  isSubmitted: boolean;
  inAnimation: boolean;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private http: HttpClient) {
    //loader

    this.inAnimation = false;

    this.fadeOut();

    this.loginForm = this.formBuilder.group({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    });
    this.isSubmitted = false;

  }

  //this has to be a function so that unit tests can spyOn it and mock it properly
  windowReload() {
    window.location.reload();
  }

  async login(): Promise<string> {
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];
    this.isSubmitted = true;

    if(email.value != '' && password.value != '') {
      //Amplify Auth
      try {
        const user = await Auth.signIn(email.value, password.value);
        this.loggedIn.emit(user); //for integration testing purposes
        this.router.navigate(['dashboard']);
        setTimeout(() => {
          this.windowReload();
          //window.location.reload();
        }, 1);
        return "success"; //for unit testing
      } catch (error: any) {
        console.log('error signing in', error);
        return error.stack.toString();  //for unit testing
      }
    }
    return "failure"; //for unit testing
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  fadeOut () {
    if (!this.inAnimation){
      this.inAnimation = true;
      document.addEventListener('readystatechange', (event) => {
        if(document.readyState === 'complete'){
          const loader = document.getElementById("pre-loader");
          loader!.setAttribute("class", "fade-out");
          let count = 0;
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
  }
}

}
