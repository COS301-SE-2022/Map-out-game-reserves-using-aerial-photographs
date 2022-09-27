import { Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { User } from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
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
  inAnimation: boolean;
  hide:boolean;
  hide2:boolean;
  errState: boolean;

  title = 'register-component';


  constructor(private apiController: ControllerService, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
    //loader
    this.inAnimation = false;
    this.fadeOut();

    this.registerForm = new UntypedFormGroup({
      user_email: new UntypedFormControl('', [Validators.required, Validators.email]),
      user_password: new UntypedFormControl('', [Validators.required]),
      repeatedPassword: new UntypedFormControl('', [Validators.required]),
      user_name: new UntypedFormControl('', [Validators.required])
    });
    this.isSubmitted = false;
    this.hide=true;
    this.hide2=true;
    this.errState=false;
  }

  getErrorMessage() {
    if (this.registerForm.controls['user_email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls['user_email'].hasError('email') ? 'Not a valid email' : '';
  }

  onRegisterFormSubmit(user: User) {
    if (this.isSubmitted){
      this.errState=false;
      if(document.getElementById('loginBtn')!=null) {//for testing purposes
        document.getElementById('loginBtn')!.style.display="none";
      }
      const email = this.registerForm.controls['user_email'].value;
    const password = this.registerForm.controls['user_password'].value;
    const repeatedPassword = this.registerForm.controls['repeatedPassword'].value;
    const name = this.registerForm.controls['user_name'].value;

    // TODO: perform validation for email, password

    if (name == '' || email == '' || password == '' || repeatedPassword == '') {
      if(document.getElementById('loginBtn')!=null) {//for testing purposes
        document.getElementById('loginBtn')!.style.display="flex";
      }
      this.errState=true;
      return;
    }

    if (this.registerForm.controls['user_email'].errors?.['email']) {
      if(document.getElementById('loginBtn')!=null) {//for testing purposes
        document.getElementById('loginBtn')!.style.display="flex";
      }
      this.errState=true;
      return;
    }

    if (password !== repeatedPassword) {
      this.snackBar.open("Passwords do not match.", "❌");
      if(document.getElementById('loginBtn')!=null) {//for testing purposes
        document.getElementById('loginBtn')!.style.display="flex";
      }
      this.errState=true;
      return;
    }

    this.apiController.tryRegister(user).subscribe({
      next: (resp: any) => {
        console.log("[CLIENT] tryRegister response: ", resp);
        if(resp.statusCode == 200){
          //Successful registration, log user in and redirect to dashboard
          this.apiController.finishRegistration(user).then(async (res: number) => {
            if (res == 1) {
              this.router.navigate(['dashboard']);
              setTimeout(() => {
                window.location.reload();
              }, 1);
            }

            this.registered.emit(res); //integration testing purposes
          });
        } else {
          this.snackBar.open("Your email has not been invited.", "❌", { verticalPosition: 'bottom' });
          if(document.getElementById('loginBtn')!=null) {//for testing purposes
            document.getElementById('loginBtn')!.style.display="flex";
          }
          this.isSubmitted=false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open("Your email has not been invited.", "❌", { verticalPosition: 'bottom' });
        this.isSubmitted=false;
      }
    });
    }

    
  }

  // openOtpDialog(u: User): void {
  //   const dialogRef = this.dialog.open(OtpDialogComponent, {
  //     width: '500px',
  //     data: { otp: ''},
  //   });

  //   this.dialogState.emit(dialogRef.getState());

  //   dialogRef.afterClosed().subscribe(async code => {
  //     if(code == undefined) {
  //       return;
  //     }

  //     //confirm user if OTP is correct
  //     try {
  //       await Auth.confirmSignUp(u.user_email!, code);
  //       try {
  //         await Auth.signIn(u.user_email!, u.user_password!);
  //         this.router.navigate(['dashboard']);
  //         this.snackBar.open("Successfully Registered!", "✔️", { duration: 3000, verticalPosition: 'top' });
  //       } catch (error) {
  //           console.log('error signing in', error);
  //       }
  //     } catch (error) {
  //         console.log('error confirming sign up', error);
  //         this.snackBar.open("Invalid OTP.", "❌", { verticalPosition: 'top' });
  //     }
  //   });
  // }


  public get email() { return this.registerForm.get('user_email'); }
  public get password() { return this.registerForm.get('user_password'); }
  public get repeatedPassword() { return this.registerForm.get('repeatedPassword'); }
  public get name() { return this.registerForm.get('user_name'); }

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
