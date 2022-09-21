import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'aerial-mapping-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  url: string;
  constructor(private location: Location) {
    this.url = '';
    const state: any = this.location.getState();
    if (state != null) {
      this.url = 'http://102.141.170.62:8000/public/task/' + state.taskID + '/iframe/3d/';
    }
  }
}
