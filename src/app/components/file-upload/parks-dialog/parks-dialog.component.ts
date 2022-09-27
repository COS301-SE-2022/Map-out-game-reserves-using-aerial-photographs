import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string,
  location: string,
  address: string;
}

@Component({
  selector: 'app-parks-dialog',
  templateUrl: './parks-dialog.component.html',
  styleUrls: ['./parks-dialog.component.scss']
})
export class ParksDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ParksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.data.name == ''||this.data.address == ''||this.data.location == '') {
      return;
    }
  this.dialogRef.close({"name": this.data.name, "location": this.data.location, "address": this.data.address});
  }
}
