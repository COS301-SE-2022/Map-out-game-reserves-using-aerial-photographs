import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapcollectionComponent } from './mapcollection/mapcollection.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapcollectionComponent],
  exports: [MapcollectionComponent]
})
export class ClientMapcollectionModule {}
