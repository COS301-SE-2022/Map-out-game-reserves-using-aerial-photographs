import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import {
  APIService,
  Images,
  ImageCollection,
  ListImageCollectionsQuery,
} from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';

interface ImageData {
  image: Images;
  url: SafeUrl;
}

interface CatalogData {
  catalogue: any;
  images: ImageData[];
}

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent {
  selected: string;
  tempCatalogues: Array<any> = [];
  catalogues: CatalogData[] = [];
  selectedCatalogue:any = null;

  sort = {
    date: 'date',
    park: 'park',
  };

  constructor(
    private api: APIService,
    private apiController: ControllerService,
    private snackbar: MatSnackBar
  ) {
    this.selected = 'date';

    this.getAllCatalogues();
  }

  getAllCatalogues() {
    this.api
      .ListImageCollections()
      .then((data: ListImageCollectionsQuery) => {
        console.log(data);

        for (const catalog of data.items) {
          this.catalogues.push({
            catalogue: catalog,
            images: []
          })
        }
         
        for (const catalogData of this.catalogues){
            console.log(22,catalogData.catalogue.collectionID);
            this.api
              .ImagesByCollectionId(catalogData.catalogue.collectionID)
              .then((resp: any) => {
                console.log(resp.items);
                for (const image of resp.items) {
                  catalogData.images.push({ image: image, url: '' });
                }

                for (const i of catalogData.images) {
                  this.apiController
                    .S3download(
                      i.image.imageID,
                      catalogData.catalogue.collectionID,
                      'images',
                      false
                    )
                    .then((signedURL) => {
                      i.url = signedURL;
                    });
                }
                this.sortByDate();
                this.tempCatalogues = this.catalogues;
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

  searchCatalogues() {
    //search for either a matching date string or a collection name
    //or a park name?
    // const searchTerm = (<HTMLInputElement>(
    //   document.getElementById('searchInput')
    // )).value.toLowerCase();
    // if (searchTerm != '') {
    //   this.catalogues = this.tempCatalogues;
    //   this.catalogues = this.catalogues.filter((c) => {
    //     const date = new Date(c.upload_date_time!).toDateString().toLowerCase();
    //     return date.includes(searchTerm);
    //   });
    // } else {
    //   this.getAllCatalogues();
    // }
  }

  onChangeSort(selectedOption: any) {
    this.selected = selectedOption.target.value;
    if (this.selected == 'date') {
      this.sortByDate();
    } else if (this.selected == 'park') {
      this.sortByPark();
    }
  }

  sortByDate() {
    // this.catalogues.sort((a, b) => {
    //   return (
    //     new Date(a.upload_date_time!).getTime() -
    //     new Date(b.upload_date_time!).getTime()
    //   );
    // });
  }

  sortByPark() {
    this.catalogues.sort((a: any, b: any) => a.parkID - b.parkID!);
  }

  enlarge(catalogue:CatalogData) {
    const doc = document.getElementById('popup');
    if (doc !== null) {
      this.selectedCatalogue = catalogue;
      doc.style.display = 'block';
    }
  }

  closePopup() {
    const doc = document.getElementById('popup');
    if (doc !== null) {
      this.selectedCatalogue = null;
      doc.style.display = 'none';
    }
  }
}
