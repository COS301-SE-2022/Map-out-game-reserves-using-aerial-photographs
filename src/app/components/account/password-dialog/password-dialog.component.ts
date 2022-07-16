import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  currentPassword: string,
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    // this.changePasswordForm = fb.group({
    //   newPassword: [data.currentPassword, [Validators.required, Validators.minLength(8)]],
    //   confirmedPassword: [data.newPassword, [Validators.required, Validators.minLength(8)]]
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // if(this.changePasswordForm.valid) {
    //
    // }
    if(this.data.newPassword !== this.data.confirmedPassword) {
      alert("Not matching!");
      return;
    }
    this.dialogRef.close(this.data.newPassword);
  }
}
