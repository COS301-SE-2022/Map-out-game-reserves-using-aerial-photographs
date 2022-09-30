import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  currentEmail: string;
  newEmail: string;
}

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss'],
})
export class EmailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  //closes the change email dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //gathers the new email data
  onSubmit() {
    if (this.data.newEmail == '') {
      return;
    }
    this.dialogRef.close(this.data.newEmail);
  }
}
