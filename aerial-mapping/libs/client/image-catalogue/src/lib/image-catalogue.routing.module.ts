import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageCatalogueComponent } from './image-catalogue/image-catalogue.component'

const routes: Routes = [
  {
    path: '',
    component: ImageCatalogueComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageCatalogueRoutingModule { }
