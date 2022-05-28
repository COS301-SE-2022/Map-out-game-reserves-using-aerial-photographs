import { Component } from '@angular/core';

@Component({
  selector: 'aerial-mapping-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent  {
  constructor(){
    //blank
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
}
