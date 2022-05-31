import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'aerial-mapping-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  {
  registerForm: FormGroup;

  constructor(private router: Router, private apiService: ClientApiService){
    this.registerForm = new FormGroup({
      inviteEmail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmitRegisterForm() {
    const email = this.registerForm.controls['inviteEmail'].value;

    //TODO:perform basic email validation first

    //send invite to submitted email
    this.apiService.invite(email).subscribe({
      next: (res) => {
        if(res.data.invite == "Created invite!") {
          //replace with nice angular-notifier notification
          alert(res.data.invite);
          return;
        }
        alert(res.data.invite);
      },
      error: (err) => {
        console.log(err);
      }
    })

    //TODO: close register popup
  }

  changeName () {
    const editName = document.getElementById('myFormName');
    if(editName!=null) {
      editName.style.display='block';
    }
  }

  changeEmail () {
    const editEmail = document.getElementById('myFormEmail');
    if(editEmail!=null) {
      editEmail.style.display='block';
    }
  }

  changePassword () {
    const editPsw = document.getElementById('myFormPassword');
    if(editPsw!=null) {
      editPsw.style.display='block';
    }
  }

  sendLink () {
    const link = document.getElementById('myFormRegister');
    if(link!=null) {
      link.style.display='block';
    }
  }

  closeFormName() {
    const editName = document.getElementById('myFormName');
    if(editName!=null) {
      editName.style.display='none';
    }
  }

  closeFormEmail() {
    const editEmail = document.getElementById('myFormEmail');
    if(editEmail!=null) {
      editEmail.style.display='none';
    }
  }

  closeFormPsw () {
    const editPsw = document.getElementById('myFormPassword');
    if(editPsw!=null) {
      editPsw.style.display='none';
    }
  }

  closeFormRegister () {
    const link = document.getElementById('myFormRegister');
    if(link!=null) {
      link.style.display='none';
    }
  }

  logout() {
    this.deleteCookie('jwt');
    this.router.navigate(['login']);
  }

  getCookie(name: string) {
    return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
    });
  }

  deleteCookie(name: string, path?: string, domain?: string) {
    if (this.getCookie(name)) {
      document.cookie = name + "=" +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
}
