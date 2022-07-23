import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() registered = new EventEmitter<any>();  //integration testing purposes
  @Output() dialogState = new EventEmitter<any>(); //integration testing purposes
  registerForm: UntypedFormGroup;
  isSubmitted: boolean;


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
        //OTP is emailed to the user
        this.openOtpDialog(user);
      }

      this.registered.emit(resp); //integration testing purposes
    });
  }

  openOtpDialog(u: User): void {
    const dialogRef = this.dialog.open(OtpDialogComponent, {
      width: '500px',
      data: { otp: ''},
    });

    this.dialogState.emit(dialogRef.getState());

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


  public get email() { return this.registerForm.get('user_email'); }
  public get password() { return this.registerForm.get('user_password'); }
  public get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }
  public get name() { return this.registerForm.get('user_name'); }
}
