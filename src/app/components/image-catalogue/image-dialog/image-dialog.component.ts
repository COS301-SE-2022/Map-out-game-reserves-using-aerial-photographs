import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { promises } from 'dns';
import { APIService, DeleteImageCollectionInput, GetImagesByCollectionIdQuery, DeleteImagesInput, GetMessageByCollectionIdQuery, DeleteMessageInput, ImagesByCollectionIdQuery } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  result: boolean = false;

  constructor( private router : Router, private api: APIService,  private controller: ControllerService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private apiController: ControllerService,
    public dialog: MatDialog,
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
    // if(this.result==true) {
      // Delete from S3
        // ----- Not yet working completely -----
        // TODO:
      // this.apiController.S3delete(this.selectCatalogue.collectionID);
      // this.apiController.S3delete("00265eba-6e41-45db-ab10-ee3a5cc98c84/");

      // Delete images from database
      var deleteArray: string[] = [];
      this.api
        .ImagesByCollectionId(this.selectCatalogue.collectionID)
        .then((resp: any) => {
          for (const v of resp.items) {
            console.log(v.imageID);
            deleteArray.push(v.imageID);
          }
        });

        for (const v of deleteArray) {
          let deleteID: DeleteImagesInput = {imageID: v};
          this.api.DeleteImages(deleteID);
        }

      // Delete imageCollection from database
      var deleteInput: DeleteImageCollectionInput = {collectionID: ''};
      deleteInput.collectionID = this.selectCatalogue.collectionID;
      this.api.DeleteImageCollection(deleteInput);

      if (tryAgain) {
        //-------------Delete Error Message
        //make sure id cant be null
        var ID = this.selectCatalogue.collectionID;
        if(ID==null){
          ID="";
        }
        this.api.GetMessageByCollectionId(ID).then((value: GetMessageByCollectionIdQuery) => {
          // const temp:Array<> = value.items;
          // console.log(value.items[0]?.messageID);
          let t: string|undefined = value.items[0]?.messageID;
          if (t ==undefined){
            t="";
          }
          let deleteId : DeleteMessageInput = {messageID : t};
          this.api.DeleteMessage(deleteId);
        });
        // this.snackbar.open("Error message dismissed", '❌', {
        //   verticalPosition: 'bottom',
        // });
        if(document.getElementById(ID) != null) {
          document.getElementById(ID)!.style.display='none';
        }

        // ---------redirect to create map
        // this.router.navigateByUrl('/create-map');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1);
      }
      this.dialogRef.close();
    // }
    // else {

    // }
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

  confirmDialog(tryAgain:boolean): void {
    // this.dialogRef.close();
    const message = `Are you sure you want to do delete this map?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      // console.log(dialogResult);
      if (dialogResult === true) {
        this.onDeleteClick(tryAgain);
      }
    });
  }
}
