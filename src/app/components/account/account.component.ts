import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIService, UpdateUserInput, User } from 'src/app/API.service';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
const bcrypt = require('bcryptjs');



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

  currPassword: string = "";
  currUserID: string = "";
  newPassword: string = "";
  currUser: User|null = null;
  registerForm: FormGroup;
  passwordForm: FormGroup;
  passwordVisible: boolean = false;
  closedeye = faEyeSlash;


  constructor(
    private router: Router,
    private api: APIService,
    public dialog: MatDialog
  ) {
    this.registerForm = new FormGroup({
      inviteEmail: new FormControl('', [Validators.required, Validators.email]),
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async ngOnInit() {
    this.passwordForm.controls['password']!.disable();

    try {
      const user = await Auth.signIn("test@gmail.com", "12345678");
    } catch (error) {
      console.log('error signing in', error);
    }

    try {
      await Auth.currentAuthenticatedUser({ bypassCache: false }).then(async (res: any) => {
        //this.currUser?.userID = res.attributes.userID;
        console.log(res);

        this.api.UserByEmail(res.attributes.email).then((resp: any) => {
          if(resp.items.length > 0) {
            console.log(resp.items)
            const user = resp.items[0];
            this.name.nativeElement.innerHTML = user.user_name;
            this.email.nativeElement.innerHTML = user.user_email;
            this.role.nativeElement.innerHTML = user.user_role.charAt(0).toUpperCase() + user.user_role.slice(1);
            this.password.nativeElement.value = user.user_password;
            this.currPassword = user.user_password;
            this.currUserID = user.userID;
          }
        }).catch(err => { console.log(err); })
      });
    } catch(error) {
      console.log(error);
    }
  }

  onSubmitRegisterForm() {
    const email = this.registerForm.controls['inviteEmail'].value;

    //TODO:perform basic email validation first



    //send invite to submitted email
    // this.apiService.invite(email).subscribe({
    //   next: (res) => {
    //     if (res.data.invite == "Created invite!") {
    //       //replace with nice angular-notifier notification
    //       alert(res.data.invite);
    //       return;
    //     }
    //     alert(res.data.invite);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    //TODO: close register popup
  }

  changeName() {
    const editName = document.getElementById('myFormName');
    if (editName != null) {
      editName.style.display = 'block';
    }
  }

  changeEmail() {
    const editEmail = document.getElementById('myFormEmail');
    if (editEmail != null) {
      editEmail.style.display = 'block';
    }
  }

  changePassword() {
    // const editPsw = document.getElementById('myFormPassword');
    // if (editPsw != null) {
    //   editPsw.style.display = 'block';
    // }
    this.openDialog();
  }

  viewPassword() {
    if(this.passwordVisible) {
      this.passwordVisible = false;
      //set DOM to change icon to openeye
      const close = document.getElementById("closedEyeIcon");
      close!.innerHTML = "visibility_off";
      //set password value to invisible
      this.password.nativeElement.type = "password";
      return;
    }
    this.passwordVisible = true;
    //set DOM to change icon to closedeye
    const close = document.getElementById("closedEyeIcon");
    close!.innerHTML = "visibility";
    //set password value to visible
    this.password.nativeElement.type = "text";
  }

  sendLink() {
    const link = document.getElementById('myFormRegister');
    if (link != null) {
      link.style.display = 'block';
    }
  }

  closeFormName() {
    const editName = document.getElementById('myFormName');
    if (editName != null) {
      editName.style.display = 'none';
    }
  }

  closeFormEmail() {
    const editEmail = document.getElementById('myFormEmail');
    if (editEmail != null) {
      editEmail.style.display = 'none';
    }
  }

  closeFormPsw() {
    const editPsw = document.getElementById('myFormPassword');
    if (editPsw != null) {
      editPsw.style.display = 'none';
    }
  }

  closeFormRegister() {
    const link = document.getElementById('myFormRegister');
    if (link != null) {
      link.style.display = 'none';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '500px',
      data: { currentPassword: this.currPassword},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newPassword = result;
      //hash new password
      bcrypt.genSalt(10, (_err: any, salt: string) => {
        bcrypt.hash(this.newPassword, salt, async (_error: any, hash: string) => {
          //update user with new password hash
          const updatedUser: UpdateUserInput = {
            userID: this.currUserID,
            user_password: hash,
            user_password_salt: salt
          };
          this.api.UpdateUser(updatedUser).then(() => {
            this.password.nativeElement.value = hash;
          });
        });
      });
    });
  }

  async logout() {
    try {
      await Auth.signOut();
      this.router.navigate(['login']);
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}
