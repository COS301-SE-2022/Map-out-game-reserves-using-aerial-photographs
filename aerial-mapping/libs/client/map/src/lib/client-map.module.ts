import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './map-view/map-view.component';
import { MapRoutingModule } from './map-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    FontAwesomeModule
  ],
  declarations: [MapViewComponent],
})
export class ClientMapModule {}
