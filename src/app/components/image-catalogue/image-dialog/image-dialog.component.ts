import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  APIService,
  DeleteImageCollectionInput,
  DeleteImagesInput,
  GetMessageByCollectionIdQuery,
  DeleteMessageInput,
} from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from './confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from 'aws-amplify';

export interface CatalogData {
  completed: boolean | undefined;
  error: boolean | undefined;
  images: any;
  taskID: string | undefined;
  collectionID: string;
}

export interface DialogData {
  selectedCatalogue: any;
  newName: string;
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  selectCatalogue: CatalogData;
  spinners: HTMLElement[];
  result: boolean = false;
  admin: boolean = false;

  constructor(
    private router: Router,
    private api: APIService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private apiController: ControllerService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.selectCatalogue = data.selectedCatalogue;
    this.spinners = [];
    setTimeout(() => {
      this.spinners = Array.from(
        document.getElementsByClassName(
          'spinner'
        ) as HTMLCollectionOf<HTMLElement>
      );
      this.spinners.forEach((spin) => {
        spin.style.display = 'none';
      });
    }, 4000);

  }

  async ngOnInit() {
      await Auth.currentAuthenticatedUser({ bypassCache: false }).then(async (res: any) => {
        const groups: Array<any> = res.signInUserSession.idToken.payload['cognito:groups'];
        groups.forEach((group: any) => {
          if (group == 'Admin') {
            this.admin = true;
          }
        });
      }, (err: any) => {
        console.log(err);
      });
  }

  //closes the image-dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //deletes the selected image collection
  async onDeleteClick(tryAgain: boolean): Promise<void> {
    this.apiController.S3delete(
      this.selectCatalogue.collectionID + '/thumbnails/thumbnail_0'
    );
    this.apiController.S3delete(
      this.selectCatalogue.collectionID + '/thumbnails/thumbnail_1'
    );
    this.apiController.S3delete(
      this.selectCatalogue.collectionID + '/thumbnails/thumbnail_2'
    );

    // Delete images from database
    this.selectCatalogue.images.forEach((imageData: any) => {
      this.apiController.S3delete(
        this.selectCatalogue.collectionID + '/images/' + imageData.image.imageID
      );
      let deleteID: DeleteImagesInput = { imageID: imageData.image.imageID };
      this.api.DeleteImages(deleteID);
    });

    //Delete imageCollection from database
    var deleteInput: DeleteImageCollectionInput = { collectionID: '' };
    deleteInput.collectionID = this.selectCatalogue.collectionID;
    this.api.DeleteImageCollection(deleteInput);

    this.dialogRef.close();
    if (tryAgain) {
      //-------------Delete Error Message
      //make sure id cant be null
      var ID = this.selectCatalogue.collectionID;
      if (ID == null) {
        ID = '';
      }
      this.api
        .GetMessageByCollectionId(ID)
        .then((value: GetMessageByCollectionIdQuery) => {
          let t: string | undefined = value.items[0]?.messageID;
          if (t == undefined) {
            t = '';
          }
          let deleteId: DeleteMessageInput = { messageID: t };
          this.api.DeleteMessage(deleteId);
        });
      if (document.getElementById(ID) != null) {
        document.getElementById(ID)!.style.display = 'none';
      }
    }
  }

  //opens the selected map
  onSubmit(taskID?: string) {
    if (taskID != null) {
      this.router.navigateByUrl('/map', { state: { taskID: taskID } });
      this.dialogRef.close();
      return;
    }
    this.router.navigate(['map']);
    this.dialogRef.close();
  }

  //confirms if the user wants to delete the selected image collection
  confirmDialog(tryAgain: boolean): void {
    const message = `Are you sure you want to do delete this map?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
      if (dialogResult === true) {
        this.onDeleteClick(tryAgain).then(() => {
          if (tryAgain) {
            setTimeout(() => {
              this.router.navigateByUrl('/create-map');
              setTimeout(() => {
                window.location.reload();
              }, 1);
            }, 1500);
          } else {
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        });
      }
    });
  }
}
