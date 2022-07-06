import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Component } from '@angular/core';
import { Images, Image_Collection } from '@prisma/client';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent {
  selected: string;
  tempCatalogues: Image_Collection[] = [];
  catalogues: Image_Collection[] = [];
  images: ImageData[] = [];

  sort = {
    date: 'date',
    park: 'park'
  }

  constructor(public apiService: ClientApiService, private sanitizer: DomSanitizer) {
    this.selected = 'date';

    this.getAllCatalogues();
  }

  getAllCatalogues() {
    this.apiService.getImageCollections().subscribe({
      next: (resp) => {
        console.log(resp)
        this.catalogues = resp.data.getImageCollections;

        for (const catalog of this.catalogues) {
          this.apiService.getImagesByCollectionId(catalog.collectionID).subscribe({
            next: (res) => {
              for (const i of res.data.getImagesByCollectionId) {
                this.images.push({ image: i, url: '' });
              }

              for (const i of this.images) {
                //pull image data from s3 for each image
                this.apiService.getImageData(i.image.bucket_name, i.image.file_name).subscribe({
                  next: (resp) => {
                    const tempUrl = resp.observe;
                    i.url = this.sanitizer.bypassSecurityTrustUrl(tempUrl);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                });
              }
              this.sortByDate();
              this.tempCatalogues = this.catalogues;
            },
            error: (err) => {
              console.log(err)
            }
          });
        }
        return resp.data.getImageCollections;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  searchCatalogues(e: Event) {
    //search for either a matching date string or a collection name
    //or a park name?
    const searchTerm = (<HTMLInputElement>document.getElementById('searchInput')).value.toLowerCase();
    if(searchTerm != '') {
      this.catalogues = this.tempCatalogues;
      this.catalogues =  this.catalogues.filter((c) => {
        const date = new Date(c.upload_date_time).toDateString().toLowerCase()
        return date.includes(searchTerm)
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
      return new Date(a.upload_date_time).getTime() - new Date(b.upload_date_time).getTime();
    });
  }

  sortByPark() {
    this.catalogues.sort((a, b) => a.parkID - b.parkID);
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

interface ImageData {
  image: Images;
  url: SafeUrl;
}
