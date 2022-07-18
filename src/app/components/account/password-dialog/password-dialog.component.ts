import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  newPassword: string;
  confirmedPassword: string;
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent {
  //changePasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.data.newPassword == '' || this.data.confirmedPassword == '') {
      return;
    }
    if(this.data.newPassword !== this.data.confirmedPassword) {
      alert("Passwords do not match!");
      return;
    }
    this.dialogRef.close(this.data.newPassword);
  }
}
