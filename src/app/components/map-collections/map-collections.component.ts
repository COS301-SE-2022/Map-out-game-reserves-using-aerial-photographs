import { Component } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';

interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'aerial-mapping-mapcollection',
  templateUrl: './map-collections.component.html',
  styleUrls: ['./map-collections.component.scss'],
})
export class MapcollectionComponent {
  selected: string;
  subscription: any;
  // tempCatalogues: Image_Collection[] = [];
  // catalogues: Image_Collection[] = [];
  // images: ImageData[] = [];

  sort = {
    date: 'date',
    park: 'park'
  }

  constructor() {
    this.selected = 'date';
  }

  searchMapCollections(e: Event) {
    //search for either a matching date string or a collection name or a park name?
    const searchTerm = (<HTMLInputElement>document.getElementById('searchInput')).value.toLowerCase();
    if(searchTerm != '') {
      // this.catalogues = this.tempCatalogues;
      // this.catalogues =  this.catalogues.filter((c) => {
      //   const date = new Date(c.upload_date_time).toDateString().toLowerCase()
      //   return date.includes(searchTerm)
      // })
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
    // this.catalogues.sort((a, b) => {
    //   return new Date(a.upload_date_time).getTime() - new Date(b.upload_date_time).getTime();
    // });
  }

  sortByPark() {
    //this.catalogues.sort((a, b) => a.parkID - b.parkID);
  }
}
