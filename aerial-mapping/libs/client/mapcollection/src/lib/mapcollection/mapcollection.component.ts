import { Component, OnInit } from '@angular/core';

interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'aerial-mapping-mapcollection',
  templateUrl: './mapcollection.component.html',
  styleUrls: ['./mapcollection.component.scss'],
})
export class MapcollectionComponent implements OnInit {
  sort: Sort[] = [
    {value: 'date-0', viewValue: 'Upload Date'},
    {value: 'area-1', viewValue: 'Area'},
    {value: 'time-2', viewValue: 'Upload Time'},
  ];
  constructor() {
    //code
  }

  

  ngOnInit(): void {
console.log('Component Initialised');
  }
}
