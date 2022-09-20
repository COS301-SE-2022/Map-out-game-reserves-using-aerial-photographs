import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  otp: number;
}

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.scss'],
})
export class OtpDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OtpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.data.otp == 0) {
      return;
    }
    this.dialogRef.close(this.data.otp);
  }
}
