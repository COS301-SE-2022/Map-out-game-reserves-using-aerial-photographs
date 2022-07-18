import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  recipient: string,
}

@Component({
  selector: 'app-register-link-dialog',
  templateUrl: './register-link-dialog.component.html',
  styleUrls: ['./register-link-dialog.component.scss']
})
export class RegisterLinkDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RegisterLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.data.recipient == '') {
      return;
    }
    this.dialogRef.close(this.data.recipient);
  }
}
