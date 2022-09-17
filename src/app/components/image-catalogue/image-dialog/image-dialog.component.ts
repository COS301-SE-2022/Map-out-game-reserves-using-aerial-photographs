import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { promises } from 'dns';
import { APIService, DeleteImageCollectionInput, GetImagesByCollectionIdQuery, DeleteImagesInput } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
export interface CatalogData {
  completed: boolean | undefined,
  error: boolean | undefined,
  images: any,
  taskID: string | undefined,
  collectionID: string
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

  constructor( private router : Router, private api: APIService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private apiController: ControllerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.selectCatalogue = data.selectedCatalogue;
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

  onDeleteClick(tryAgain:boolean): void {
    // Delete from S3
      // ----- Not yet working completely -----
    // this.apiController.S3delete(this.selectCatalogue.collectionID);
    // this.apiController.S3delete("00265eba-6e41-45db-ab10-ee3a5cc98c84/");

    // Delete images from database
    this.api
      .GetImagesByCollectionId(this.selectCatalogue.collectionID)
      .then((value: GetImagesByCollectionIdQuery[]) => {
        for (const v of value) {
          let deleteID: DeleteImagesInput = {imageID: v.imageID};
          this.api.DeleteImages(deleteID);
        }
      });

    //Delete imageCollection from database
    var deleteInput: DeleteImageCollectionInput = {collectionID: ''};
    deleteInput.collectionID = this.selectCatalogue.collectionID;
    this.api.DeleteImageCollection(deleteInput);

    if (tryAgain) {
      this.router.navigateByUrl('/create-map');
      setTimeout(() => {
        window.location.reload();
      }, 1);
    }
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
