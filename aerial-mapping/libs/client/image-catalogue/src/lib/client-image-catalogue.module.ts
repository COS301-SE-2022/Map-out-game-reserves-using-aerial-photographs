import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCatalogueComponent } from './image-catalogue/image-catalogue.component';
import { ImageCatalogueRoutingModule } from './image-catalogue.routing.module';
import { MatCardModule } from '@angular/material/card';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    ImageCatalogueRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    ComponentsNavbarModule
  ],
  declarations: [ImageCatalogueComponent],
})
export class ClientImageCatalogueModule {}
