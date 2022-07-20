import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { APIService, Images, ListImageCollectionsQuery } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';

interface ImageData {
  image: Images;
  url: SafeUrl;
}

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent {
  selected: string;
  tempCatalogues: Array<any> = [];
  catalogues: Array<any> = [];
  images: ImageData[] = [];

  sort = {
    date: 'date',
    park: 'park'
  }

  constructor(private api: APIService, private controller: ControllerService, private sanitizer: DomSanitizer) {
    this.selected = 'date';

    this.getAllCatalogues();
  }

  getAllCatalogues() {
    this.api.ListImageCollections().then((data: ListImageCollectionsQuery) => {
      console.log(data);
      this.catalogues = data.items;

      for(const catalog of this.catalogues) {
        this.api.ImagesByCollectionId(catalog.collectionID).then((resp: any) => {
          for(const image of resp.items) {
            this.images.push({ image: image, url: '' });
          }

          for(const i of this.images) {
            i.image.file_name = "10-frame-6.png"; //temp mock
            this.controller.getImageData(i.image.bucket_name!, i.image.file_name!)
            .then((res: Observable<any>) => {
              res.subscribe({
                next: (data: any) => {
                  console.log(data);
                  const tempUrl = data.observe;
                  i.url = this.sanitizer.bypassSecurityTrustUrl(tempUrl);
                },
                error: (err: any) => {
                  console.log(err);
                }
              });
            }).catch(e => console.log(e));
          }
          this.sortByDate();
          this.tempCatalogues = this.catalogues;

        }).catch(e => console.log(e));
      }

      return data.items;
    }).catch(e => console.log(e));
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  searchCatalogues() {
    //search for either a matching date string or a collection name
    //or a park name?
    const searchTerm = (<HTMLInputElement>document.getElementById('searchInput')).value.toLowerCase();
    if(searchTerm != '') {
      this.catalogues = this.tempCatalogues;
      this.catalogues =  this.catalogues.filter((c) => {
        const date = new Date(c.upload_date_time!).toDateString().toLowerCase()
        return date.includes(searchTerm);
      })
    }
    else {
      this.getAllCatalogues();
    }
  }

  onChangeSort(selectedOption: any) {
    this.selected = selectedOption.target.value;
    if (this.selected == 'date') {
      this.sortByDate()
    } else if (this.selected == 'park') {
      this.sortByPark()
    }
  }

  sortByDate() {
    this.catalogues.sort((a, b) => {
      return new Date(a.upload_date_time!).getTime() - new Date(b.upload_date_time!).getTime();
    });
  }

  sortByPark() {
    this.catalogues.sort((a: any, b: any) => a.parkID - b.parkID!);
  }

  enlarge() {
    const doc = document.getElementById('popup');
    if (doc !== null) {
      doc.style.display = 'block';
    }
  }

  closePopup() {
    const doc = document.getElementById('popup');
    if (doc !== null) {
      doc.style.display = 'none';
    }
  }
}
