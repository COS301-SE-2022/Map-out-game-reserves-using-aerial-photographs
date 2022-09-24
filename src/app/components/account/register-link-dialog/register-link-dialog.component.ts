import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  recipient: string;
}

@Component({
  selector: 'app-register-link-dialog',
  templateUrl: './register-link-dialog.component.html',
  styleUrls: ['./register-link-dialog.component.scss'],
})
export class RegisterLinkDialogComponent {
  checkboxColor: string = 'primary';
  @ViewChild('checkbox') checkbox!: ElementRef<MatCheckbox>;

  constructor(
    public dialogRef: MatDialogRef<RegisterLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  //closes the interface to rgiester a new user
  onNoClick(): void {
    this.dialogRef.close();
  }

  //gets the email fo rthe new user
  onSubmit(checked: boolean) {
    if (this.data.recipient == '') {
      return;
    }

    this.dialogRef.close({ recipient: this.data.recipient, checked: checked });
  }
}
