import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapcollectionComponent } from './mapcollection/mapcollection.component';
import { MapcollectionRoutingModule } from './mapcollection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MapcollectionRoutingModule
  ],
  declarations: [MapcollectionComponent],
  exports: [MapcollectionComponent]
})
export class ClientMapcollectionModule {}
