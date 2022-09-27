import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.data.newPassword == '' || this.data.confirmedPassword == '') {
      return;
    }
    if(this.data.newPassword !== this.data.confirmedPassword) {
      this.snackBar.open("Passwords do not match.", "❌", { verticalPosition: 'top' })
      return;
    }
    if(this.data.newPassword?.length < 8) {
      this.snackBar.open("Password must be at least 8 characters long.", "❌", { verticalPosition: 'top' })
      return;
    }
    this.dialogRef.close(this.data.newPassword);
  }
}
