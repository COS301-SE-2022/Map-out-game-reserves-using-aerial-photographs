import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'aerial-mapping-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitted: boolean;

  constructor(private apiService: ClientApiService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatedPassword: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
    });
    this.isSubmitted = false;
  }

  getErrorMessage() {
    if (this.registerForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  onRegisterFormSubmit() {
    this.isSubmitted = true;

    const email = this.registerForm.controls['email'].value;
    const password = this.registerForm.controls['password'].value;
    const repeatedPassword = this.registerForm.controls['repeatedPassword'].value;
    const firstname = this.registerForm.controls['firstname'].value;
    const lastname = this.registerForm.controls['lastname'].value;

    // TODO: perform validation for email, password, repeatedPassword and check firstname and lastname aren't empty
    // TODO: replace alerts with a nice snackbar or something

    if(firstname == '' || lastname == '' || email == '' || password == '' || repeatedPassword == '') {
      return;
    }

    if(this.registerForm.controls['email'].errors?.['email']){
      return;
    }

    if(password !== repeatedPassword) {
      alert('Passwords do not match');
      return;
    }

    this.apiService.registerUser(firstname, lastname, email, password, 'user', true).subscribe({
      next: (resp) => {
        if(resp.data.registerUser == 'Created user!') {
          alert('Successfully registered!');
          //now login
          this.apiService.login(email, password).subscribe((response) => {
            document.cookie = "jwt=" + response.data.login + "; path=/";
            this.router.navigate(['dashboard']);
          });
        }
        else {
          alert(resp.data.registerUser);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }
  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
}
