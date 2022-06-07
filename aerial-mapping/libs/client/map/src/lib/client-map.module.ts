import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
  ],
  declarations: [MapViewComponent],
})
export class ClientMapModule {}
