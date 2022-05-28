import { Component } from '@angular/core';


@Component({
  selector: 'aerial-mapping-image-catalogue',
  templateUrl: './image-catalogue.component.html',
  styleUrls: ['./image-catalogue.component.scss'],
})
export class ImageCatalogueComponent  {
  Catalogues = [
    {id:1, name:'One', date: '28/05/2022'},
    {id:2, name:'Two', date: '24/05/2022'},
    {id:3, name:'Three', date: '28/02/2022'},
  ];
  Images = [
    {id:1, name:'img_1', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:2, name:'img_2', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:3, name:'img_3', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:4, name:'img_4', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:5, name:'img_5', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:6, name:'img_6', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:7, name:'img_7', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:8, name:'img_8', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:9, name:'img_9', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"},
    {id:10, name:'img_10', path:"https://material.angular.io/assets/img/examples/shiba2.jpg"}

  ];
  constructor() {
    console.log()
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