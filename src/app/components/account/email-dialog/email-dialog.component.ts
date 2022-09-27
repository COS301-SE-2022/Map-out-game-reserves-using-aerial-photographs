import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  currentEmail: string,
  newEmail: string;
}

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.data.newEmail == '') {
      return;
    }
    this.dialogRef.close(this.data.newEmail);
  }
}
