import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface CatalogData {
  completed: boolean | undefined,
  error: boolean | undefined,
  images: any,
  taskID: string | undefined
}

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
  selectCatalogue: CatalogData;
  spinners: HTMLElement[];

  constructor( private router : Router,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.selectCatalogue = data.selectedCatalogue
    this.spinners=[];
    setTimeout(() => {
      this.spinners = Array.from(document.getElementsByClassName('spinner') as HTMLCollectionOf<HTMLElement>)
        // console.log(this.spinners);
        this.spinners.forEach(spin => {
          spin.style.display="none";
        });
    }, 4000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(taskID?: string) {
    if(taskID != null) {
      this.router.navigateByUrl('/map', { state: { taskID: taskID } });
      this.dialogRef.close();
      return;
    }
    this.router.navigate(['map']);
    this.dialogRef.close();
  }
}
