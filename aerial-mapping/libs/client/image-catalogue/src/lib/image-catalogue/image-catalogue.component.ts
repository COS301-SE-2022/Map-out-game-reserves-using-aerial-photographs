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
  // catalogues = [
  //   {id:1, name:'One', date: '28/05/2022'},
  //   {id:2, name:'Two', date: '24/05/2022'},
  //   {id:3, name:'Three', date: '28/02/2022'},
  // ];
  // images = [
  //   {id:1, name:'img_1', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:2, name:'img_2', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:3, name:'img_3', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:4, name:'img_4', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:5, name:'img_5', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:6, name:'img_6', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:7, name:'img_7', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:8, name:'img_8', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:9, name:'img_9', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:10, name:'img_10', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:1, name:'img_1', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:2, name:'img_2', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:3, name:'img_3', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:4, name:'img_4', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:5, name:'img_5', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:6, name:'img_6', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:7, name:'img_7', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:8, name:'img_8', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:9, name:'img_9', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:10, name:'img_10', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:1, name:'img_1', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:2, name:'img_2', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:3, name:'img_3', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:4, name:'img_4', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:5, name:'img_5', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:6, name:'img_6', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:7, name:'img_7', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:8, name:'img_8', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:9, name:'img_9', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
  //   {id:10, name:'img_10', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"}
  // ];
  constructor(public apiService: ClientApiService) {
    this.selected = 'option1';

    this.apiService.getCatalogues().subscribe({
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
