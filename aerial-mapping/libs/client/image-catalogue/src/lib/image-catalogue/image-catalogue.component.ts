import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Component } from '@angular/core';
import { Images, Image_Collection } from '@prisma/client';

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent {
  selected: string;
  catalogueData: Image_Collection[] = [];
  catalogues: CollectionData[] = [];
  images: Images[][] = [];

  constructor(public apiService: ClientApiService) {
    this.selected = 'date';
  }

  async ngOnInit(): Promise<void> {
    await this.get_catalogs();
    await this.get_images();
    this.get_image_url();
  }

  async get_catalogs() {
    return this.apiService.getImageCollections().subscribe({
      next: (resp) => {
        console.log(resp);
        let i = 0;
        for (const r of resp.data.getImageCollections) {
          this.catalogues[i] = { collection: r, images: [] };
          i++;
        }
        return resp.data.getImageCollections;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async get_images() {
    let count_1 = 0;
    console.log(this.catalogues);
    for (const catalog of this.catalogues) {
      console.log(catalog.collection.collectionID);
      this.apiService
        .getImagesByCollectionId(catalog.collection.collectionID)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.images[count_1] = res.data.getImagesByCollectionId;
            count_1++;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    return;
  }

  get_image_url() {
    let count_1 = 0;
    for (const catalog of this.catalogues) {
      for (const img of this.images[count_1]) {
        this.apiService.getImageData(img.imageID).subscribe({
          next: (base64) => {
            const url = 'data:image/png;base64,' + base64;
            this.catalogues[count_1].images.push({ image: img, url: url });
            console.log(url);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
      count_1++;
    }
    return;
  }

  onChangeSort(selectedOption: HTMLSelectElement) {
    return this.apiService
      .getImageCollections()
      .toPromise()
      .then(() => {
        return '';
      });
    // const val = selectedOption.value;
    // alert(val);
    // if(val == 'date'){
    //   this.catalogues.sort((a,b) => { return b.upload_date_time.getTime() - a.upload_date_time.getTime() })
    // }
    // else if(val == 'park') {
    //   this.catalogues.sort((a,b) => { return a.name.localeCompare(b.name) })
    // }
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
  url: string;
}

interface CollectionData {
  collection: Image_Collection;
  images: ImageData[];
}
