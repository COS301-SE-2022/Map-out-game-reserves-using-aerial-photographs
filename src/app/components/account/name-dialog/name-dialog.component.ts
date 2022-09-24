import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  currentName: string;
  newName: string;
}

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss'],
})
export class NameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  //closes the interface to change name
  onNoClick(): void {
    this.dialogRef.close();
  }

  //saves the new name
  onSubmit() {
    if (this.data.newName == '') {
      return;
    }
    this.dialogRef.close(this.data.newName);
  }
}
