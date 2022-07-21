import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { User } from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'aerial-mapping-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: UntypedFormGroup;
  isSubmitted: boolean;
  users: Array<User> = [];


  constructor(private apiController: ControllerService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.registerForm = new UntypedFormGroup({
      user_email: new UntypedFormControl('', [Validators.required, Validators.email]),
      user_password: new UntypedFormControl('', [Validators.required]),
      repeatedPassword: new UntypedFormControl('', [Validators.required]),
      user_name: new UntypedFormControl('', [Validators.required])
    });
    this.isSubmitted = false;
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

    if (name == '' || email == '' || password == '' || repeatedPassword == '') {
      return;
    }

    if (this.registerForm.controls['user_email'].errors?.['email']) {
      return;
    }

    if (password !== repeatedPassword) {
      this.snackBar.open("Passwords do not match.", "❌");
      return;
    }

    this.apiController.tryRegister(user).then((resp) => {
      if(resp === -1) {
        this.snackBar.open("Your email has not been invited.", "❌", { verticalPosition: 'top' });
      }
      else {
        this.openOtpDialog(user);
      }
    });
  }

  openOtpDialog(u: User): void {
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '500px',
      data: { otp: ''},
    });

    dialogRef.afterClosed().subscribe(async code => {
      if(code == undefined) {
        return;
      }

      //confirm user if OTP is correct
      try {
        await Auth.confirmSignUp(u.user_email!, code);
        try {
          await Auth.signIn(u.user_email!, u.user_password!);
          this.router.navigate(['dashboard']);
          this.snackBar.open("Successfully Registered!", "✔️", { duration: 3000, verticalPosition: 'top' });
        } catch (error) {
            console.log('error signing in', error);
        }
      } catch (error) {
          console.log('error confirming sign up', error);
          this.snackBar.open("Invalid OTP.", "❌", { verticalPosition: 'top' });
      }
    });
  }


  get email() { return this.registerForm.get('user_email'); }
  get password() { return this.registerForm.get('user_password'); }
  get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }
  get name() { return this.registerForm.get('user_name'); }
}
