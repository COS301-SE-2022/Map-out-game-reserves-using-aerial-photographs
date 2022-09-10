import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  constructor( private router : Router,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {this.selectCatalogue = data.selectedCatalogue}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(taskID?: string) {
    if(taskID != null) {
      this.router.navigateByUrl('/map', { state: { taskID: taskID } });
      return;
    }
    this.router.navigate(['map']);
    this.dialogRef.close();
  }
}
