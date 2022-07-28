import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  selectedCatalogue: any,
  newName: string;
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {
  selectCatalogue: any = null;
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {this.selectCatalogue = data.selectedCatalogue}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // if(this.data.newName == '') {
    //   return;
    // }
    this.dialogRef.close();
  }
}
