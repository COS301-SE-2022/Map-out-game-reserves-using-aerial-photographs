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
  catalogues: Image_Collection[] = [];
  images: ImageData[] = [];

  constructor(public apiService: ClientApiService, private sanitizer: DomSanitizer) {
    this.selected = 'date';

    this.apiService.getImageCollections().subscribe({
      next: (resp) => {
        this.catalogues = resp.data.getImageCollections;

        for (const catalog of this.catalogues) {
          this.apiService.getImagesByCollectionId(catalog.collectionID).subscribe({
            next: (res) => {
              for(const i of res.data.getImagesByCollectionId) {
                this.images.push({ image: i, url: ''});
              }

              for(const i of this.images) {
                //pull image data from s3 for each image
                this.apiService.getImageData(i.image.bucket_name, i.image.file_name).subscribe({
                  next: (resp) => {
                    const tempUrl = 'data:image/png;base64,' + resp;
                    i.url = this.sanitizer.bypassSecurityTrustUrl(tempUrl);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                });
              }
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

  onChangeSort(selectedOption: HTMLSelectElement) {
    return this.apiService
      .getImageCollections()
      .toPromise()
      .then(() => {
        return '';
      });
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
