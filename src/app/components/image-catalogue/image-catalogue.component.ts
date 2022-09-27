import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import {
  APIService,
  Images,
  ListImageCollectionsQuery,
} from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 1000,
};
interface ImageData {
  image: Images;
  url: SafeUrl;
}

interface CatalogData {
  catalogue: any;
  images: ImageData[];
  thumbnails: string[];
  collectionID?: string;
  completed: boolean | undefined | null;
  error: boolean | undefined | null;
  taskID: string | undefined | null;
  collectionName: string | undefined | null;
}

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class ImageCatalogueComponent implements OnInit {
  selected: string;
  tempCatalogues: Array<any> = [];
  catalogues: CatalogData[] = [];
  selectedCatalogue: any = null;

  sort = {
    date: 'date',
    park: 'park',
    name: 'name',
  };

  inAnimation: boolean;
  spinners: HTMLElement[];

  flag = false;

  constructor(
    public dialog: MatDialog,
    private api: APIService,
    private controller: ControllerService,
    private snackbar: MatSnackBar
  ) {
    //loader
    this.inAnimation = false;
    this.fadeOut();

    this.selected = 'date';
    this.getAllCatalogues();
    if (this.controller.websocket != null) {
      this.controller.websocket.onmessage = (msg: any) => {
        this.snackbar.open(`New map stitching job (${msg}) completed.`, '✔️', {
          verticalPosition: 'top',
          duration: 3000,
        });
        //make 'View Map' button visible
        this.getAllCatalogues();
      };
    }
    this.spinners = [];
    setTimeout(() => {
      this.spinners = Array.from(
        document.getElementsByClassName(
          'spinner'
        ) as HTMLCollectionOf<HTMLElement>
      );
    }, 5000);
  }

  ngOnInit() {
    if (this.controller.websocket != null) {
      this.controller.websocket.onmessage = (msg: any) => {
        this.getAllCatalogues();
      };
    }
  }

  //fetches all the map collection data from dynamoDB
  getAllCatalogues() {
    this.api
      .ListImageCollections()
      .then((data: ListImageCollectionsQuery) => {
        for (const catalog of data.items) {
          this.catalogues.push({
            catalogue: catalog,
            images: [],
            thumbnails: [],
            collectionID: catalog?.collectionID,
            completed: catalog?.completed,
            error: catalog?.error,
            taskID: catalog?.taskID,
            collectionName: catalog?.collectionName,
          });
        }

        for (const catalogData of this.catalogues) {
          this.api
            .ImagesByCollectionId(catalogData.catalogue.collectionID)
            .then((resp: any) => {
              for (const image of resp.items) {
                catalogData.images.push({ image: image, url: '' });
              }

                for (const i of catalogData.images) {
                  this.controller
                    .S3download(
                      i.image.imageID,
                      catalogData.catalogue.collectionID,
                      'images',
                      false
                    )
                    .then((signedURL) => {
                      i.url = signedURL;
                    }).catch(err => console.log(err));
                }

                for(let i = 0;i<3;i++){
                  this.controller
                    .S3download(
                      "thumbnail_"+i,
                      catalogData.catalogue.collectionID,
                      'thumbnails',
                      false
                    )
                    .then((signedURL) => {
                      catalogData.thumbnails.push(signedURL);
                    }).catch(err => console.log(err));
                }
                // this.sortByDate();
                this.tempCatalogues = this.catalogues;
                setTimeout(() => {
                    // console.log(this.spinners);
                    this.spinners.forEach(spin => {
                      spin.style.display="none";
                    });
                }, 7000);
              })
              .catch((e) => console.log(e));
          }

        return data.items;
      })
      .catch((e) => {
        console.log(e);
        if (e.errors[0].message == 'Network Error') {
          this.snackbar.open('Network error...', '❌', {
            verticalPosition: 'top',
          });
        }
      });
  }

  //reorders the map collections by date
  orderByDate() {
    this.catalogues.sort(function (a, b) {
      if (a.catalogue.createdAt < b.catalogue.createdAt) {
        return -1;
      }
      if (a.catalogue.createdAt > b.catalogue.createdAt) {
        return 1;
      }
      return 0;
    });
  }

  //reorders the map collections by park name
  orderByPark() {
    this.catalogues.sort(function (a, b) {
      if (a.catalogue.GamePark.park_name < b.catalogue.GamePark.park_name) {
        return -1;
      }
      if (a.catalogue.GamePark.park_name > b.catalogue.GamePark.park_name) {
        return 1;
      }
      return 0;
    });
  }

  //reorders the map collections by collection name
  orderByName() {
    this.catalogues.sort(function (a, b) {
      if (a.catalogue.collectionName < b.catalogue.collectionName) {
        return -1;
      }
      if (a.catalogue.collectionName > b.catalogue.collectionName) {
        return 1;
      }
      return 0;
    });
  }

  //filters the available map collections by park name
  searchCatalogues() {
    // search for either a matching date string or a collection name
    // or a park name?
    const searchTerm = (<HTMLInputElement>(
      document.getElementById('searchInput')
    )).value.toLowerCase();

    this.catalogues = this.tempCatalogues;
    this.catalogues = this.catalogues.filter((c) => {
      let name = '';
      if (c.collectionName) {
        name = c.collectionName.toLowerCase();
      }
      return name.includes(searchTerm);
    });
  }

  //opens the interface to view the map images and the stitched map
  enlarge(catalogue: CatalogData) {
    const doc = document.getElementById('popup');
    if (doc !== null) {
      this.selectedCatalogue = catalogue;
      doc.style.display = 'block';
    }
  }

  //opens the selected image of a map collection
  openImageDialog(catalogue: CatalogData): void {
    this.selectedCatalogue = catalogue;

    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '100vw',
      data: { selectedCatalogue: this.selectedCatalogue },
    });
  }

  //closes the loader
  fadeOut() {
    if (!this.inAnimation) {
      this.inAnimation = true;

      document.addEventListener('readystatechange', () => {
        if (
          document.readyState === 'complete' ||
          document.readyState === 'interactive'
        ) {
          const loader = document.getElementById('pre-loader');
          loader!.setAttribute('class', '');
          loader!.setAttribute('class', 'fade-out');
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
    }
  }
}
