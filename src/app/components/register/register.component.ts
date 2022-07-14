import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { APIService, User } from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  isSubmitted: boolean;
  users: Array<User> = [];


  constructor(private apiController: ControllerService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = new UntypedFormGroup({
      user_email: new UntypedFormControl('', [Validators.required, Validators.email]),
      user_password: new UntypedFormControl('', [Validators.required]),
      repeatedPassword: new UntypedFormControl('', [Validators.required]),
      user_name: new UntypedFormControl('', [Validators.required])
    });
    this.isSubmitted = false;
  }

  ngOnInit() {
    // this.repo.ListUsers().then((event) => {
    //   this.users = event.items as User[];
    //   console.log(this.users);
    // });
  }

  getErrorMessage() {
    if (this.registerForm.controls['user_email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls['user_email'].hasError('email') ? 'Not a valid email' : '';
  }

  onRegisterFormSubmit(user: User) {
    this.isSubmitted = true;

    const email = this.registerForm.controls['user_email'].value;
    const password = this.registerForm.controls['user_password'].value;
    const repeatedPassword = this.registerForm.controls['repeatedPassword'].value;
    const name = this.registerForm.controls['user_name'].value;

    // TODO: perform validation for email, password
    // TODO: replace alerts with a nice snackbar or something

    if (name == '' || email == '' || password == '' || repeatedPassword == '') {
      return;
    }

    if (this.registerForm.controls['user_email'].errors?.['email']) {
      return;
    }

    if (password !== repeatedPassword) {
      alert('Passwords do not match');
      return;
    }

    this.apiController.tryRegister(user).then((resp) => {
      if(resp == -1) {
        alert('Your email has not been invited.');
      }
      else {
        alert('Successfully registered user :)');
        this.router.navigate(['dashboard']);
      }
    });

    // this.apiService.registerUser(name, email, password, 'user', true).subscribe({
    //   next: (resp) => {
    //     if (resp.data.registerUser == 'Created user!') {
    //       alert('Successfully registered!');
    //       //now login
    //       this.apiService.login(email, password).subscribe((response) => {
    //         document.cookie = "jwt=" + response.data.login + "; path=/";
    //         this.router.navigate(['dashboard']);
    //       });
    //     }
    //     else {
    //       alert(resp.data.registerUser);
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }


  get email() { return this.registerForm.get('user_email'); }
  get password() { return this.registerForm.get('user_password'); }
  get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }
  get name() { return this.registerForm.get('user_name'); }
}
