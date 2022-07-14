import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';

@Component({
  selector: 'aerial-mapping-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild("name") name!: ElementRef<HTMLInputElement>;
  @ViewChild("email") email!: ElementRef<HTMLInputElement>;
  @ViewChild("role") role!: ElementRef<HTMLInputElement>;

  registerForm: FormGroup;

  constructor(private router: Router, private api: APIService) {
    this.registerForm = new FormGroup({
      inviteEmail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    // get name, pass, email, and admin status
    // this.apiService.getCurrentUserEmail().subscribe({
    //   next: (res) => {
    //     if (res != 'No current user.') {
    //       this.apiService.getUserByEmail(res).subscribe({
    //         next: (resp) => {
    //           const user = resp.data.getUserByEmail;
    //           this.name.nativeElement.innerHTML = user.user_name;
    //           this.email.nativeElement.innerHTML = user.user_email;
    //           this.role.nativeElement.innerHTML = user.user_role.charAt(0).toUpperCase() + user.user_role.slice(1);
    //         },
    //         error: (err) => {
    //           console.log(err);
    //         }
    //       });
    //     }
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
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
    const editPsw = document.getElementById('myFormPassword');
    if (editPsw != null) {
      editPsw.style.display = 'block';
    }
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

  logout() {
    //this.deleteCookie('jwt');
    this.router.navigate(['login']);
  }
}