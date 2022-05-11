import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapcollectionComponent } from './mapcollection/mapcollection.component';

const routes: Routes = [
  {
    path: '',
    component: MapcollectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapcollectionRoutingModule { }
