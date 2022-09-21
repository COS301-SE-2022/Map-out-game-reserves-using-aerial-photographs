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
  hide:boolean;
  
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private http: HttpClient) {
    //loader
    
    this.inAnimation = false;

    this.fadeOut();
       
    this.loginForm = this.formBuilder.group({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required])
    });
    this.isSubmitted = false;

    this.hide = true;
  }

  async login() {
    if(this.isSubmitted){
      const email = this.loginForm.controls['email'];
      const password = this.loginForm.controls['password'];
  
      if(email.value != '' && password.value != '') {
        var err:string = "";
        //Amplify Auth
        try {
          const user = await Auth.signIn(email.value, password.value);
          this.router.navigate(['dashboard']);
          setTimeout(() => {
            window.location.reload();
          }, 1);
          this.loggedIn.emit(user); //for unit testing purposes
        } catch (error) {
            console.log('error signing in', error);
            this.errorOccurred(""+error);
            this.isSubmitted=false;
        }
        
      }
    }
    

  }
  errorOccurred(err:string){
    if (err!= "") {
      if(err.includes("User does not exist")) {
        if(document.getElementById("error")){ //for testing purposes
          document.getElementById("error")!.innerHTML="Either the email or password entered is incorrect"
        }
      }
    }
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
