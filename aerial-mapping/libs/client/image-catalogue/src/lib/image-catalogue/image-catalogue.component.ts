import { ClientApiService } from '@aerial-mapping/client/shared/services';
import { Component } from '@angular/core';
import { Images, Image_Collection } from '@prisma/client';

@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent  {
  selected: string;
  catalogues: Image_Collection[] = [];
  images: Images[][] = [];

  constructor(public apiService: ClientApiService) {
    this.selected = 'date';

    this.apiService.getImageCollections().subscribe({
      next: (resp) => {
        this.catalogues = resp.data.getCatalogues;

        for (const catalog of this.catalogues){
          this.apiService.getImagesByCollectionId(catalog.collectionID).subscribe({
            next: (res) => {
              this.images.push(res.data.getImagesByCollectionId);
            },
            error: (err) => {
              console.log(err)
            }
          });
        }

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onChangeSort(selectedOption: HTMLSelectElement) {
    const val = selectedOption.value;
    alert(val);
    if(val == 'date'){
      this.catalogues.sort((a,b) => { return b.upload_date_time.getTime() - a.upload_date_time.getTime() })
    }
    else if(val == 'park') {
      this.catalogues.sort((a,b) => { return a.name.localeCompare(b.name) })
    }
  }

  enlarge () {
    const doc = document.getElementById("popup");
    if (doc!==null) {
      doc.style.display = "block";
    }
  }

  closePopup () {
    const doc = document.getElementById("popup");
    if (doc!==null) {
      doc.style.display = "none";
    }
  }

}
