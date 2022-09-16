import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService, CreatePendingInvitesInput, DeletePendingInvitesInput, ModelPendingInvitesFilterInput, UpdateUserInput, User } from 'src/app/API.service';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { NameDialogComponent } from './name-dialog/name-dialog.component';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';
import { RegisterLinkDialogComponent } from './register-link-dialog/register-link-dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {
  currentPassword: string,
  newPassword: string;
  confirmedPassword: string;
}

@Component({
  selector: 'aerial-mapping-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  @ViewChild("name") name!: ElementRef<HTMLInputElement>;
  @ViewChild("email") email!: ElementRef<HTMLInputElement>;
  @ViewChild("role") role!: ElementRef<HTMLInputElement>;
  @ViewChild("password") password!: ElementRef<HTMLInputElement>;
  @ViewChild("closedEyeIcon") closedEyeIcon!: ElementRef<FaIconComponent>;

  title = 'account-component';

  user: any;
  admin: boolean = false;
  currPassword: string = "";
  currName: string = "";
  currUserID: string = "";
  newPassword: string = "";
  newName: string = "";
  currUser: User|null = null;
  registerForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  emailForm: UntypedFormGroup;
  nameForm: UntypedFormGroup;
  roleForm: UntypedFormGroup;
  passwordVisible: boolean = false;
  closedeye = faEyeSlash;
  inAnimation: boolean;


  constructor(
    private router: Router,
    private api: APIService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
     //loader
     this.inAnimation = false;
     this.fadeOut();
    this.registerForm = new UntypedFormGroup({
      inviteEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
    });
    this.passwordForm = new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.nameForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required])
    });
    this.emailForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });
    this.roleForm = new UntypedFormGroup({
      role: new UntypedFormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    try {
      await Auth.currentAuthenticatedUser({ bypassCache: false }).then(async (res: any) => {
        const groups: Array<any> = res.signInUserSession.idToken.payload['cognito:groups'];
        groups.forEach((group: any) => {
          if(group == 'Admin') {
            this.admin = true;
          }
        });

        this.api.UserByEmail(res.attributes.email).then((resp: any) => {
          if(resp.items.length > 0) {
            this.user = resp.items[0];
            this.currName = this.user.user_name;
            this.name.nativeElement.value = this.currName;
            this.email.nativeElement.value = this.user.user_email;
            this.role.nativeElement.value = this.user.user_role.charAt(0).toUpperCase() + this.user.user_role.slice(1);
            this.currPassword = this.user.user_password;
            this.currUserID = this.user.userID;
          }
        }).catch(err => {
          console.log(err);
          if(err.errors[0].message == "Network Error"){
            this.snackBar.open("Network error...", "❌", { verticalPosition: 'top' });
          }
        });
      });
    } catch(error: any) {
      console.log(error);
      this.snackBar.open("Network error...", "❌", { verticalPosition: 'top' });
    }
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '500px',
      data: { password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) {
        return;
      }
      this.newPassword = result;
      Auth.currentAuthenticatedUser({ bypassCache: false }).then(async (user: any) => {
        await Auth.changePassword(user, this.currPassword, this.newPassword).then(async () => {
          this.snackBar.open("Password changed successfully!", "✔️");
          this.currPassword = this.newPassword;
        });
      });
    });
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '500px',
      data: { currentName: this.currName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) {
        return;
      }
      this.newName = result;

      //change username in DynamoDB
      const updatedUser: UpdateUserInput = {
        userID: this.currUserID,
        user_name: this.newName
        //_version: this.user._version
      }
      this.user._version++;
      this.api.UpdateUser(updatedUser).then((res: any) => {
        this.name.nativeElement.innerHTML = this.newName;
        this.currName = this.newName;
        this.name.nativeElement.value = this.newName;
        console.log(res);
      });
    });
  }

  async openEmailDialog() {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '500px',
      data: { currentEmail: this.user.user_email}
    });

    dialogRef.afterClosed().subscribe(async newEmail => {
      if(newEmail == undefined) {
        return;
      }

      //change email in AWS Cognito
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: newEmail });

      //change email in DynamoDB
      const updatedUser: UpdateUserInput = {
        userID: this.currUserID,
        user_email: newEmail
        //_version: this.user._version
      }
      this.user._version++;
      this.api.UpdateUser(updatedUser).then((res: any) => {
        this.email.nativeElement.value = newEmail;
        console.log(res);
      });
    });
  }

  openRegisterLinkDialog() {
    const dialogRef = this.dialog.open(RegisterLinkDialogComponent, {
      width: '500px',
      data: { recipient: ''}
    });

    dialogRef.afterClosed().subscribe(async obj => {
      if(obj == undefined) {
        return;
      }

      //add invite in DynamoDB
      let role;
      if(obj.checked) {
        role = "admin";
      }
      else {
        role = "user";
      }



      const newInvite: CreatePendingInvitesInput = {
        inviteID: uuidv4(),
        email: obj.recipient,
        role: role
      }
      this.api.CreatePendingInvites(newInvite).then((res: any) => {
        //snackbar with success message (if successful?)
        this.snackBar.open(`Invite sent to ${obj.recipient}`, "✔️");
        console.log(res);
      });
    });
  }

  async logout() {
    try {
      await Auth.signOut();
      this.router.navigate(['login']);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
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
