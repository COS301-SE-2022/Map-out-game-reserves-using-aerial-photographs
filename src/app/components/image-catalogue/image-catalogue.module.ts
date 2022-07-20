import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCatalogueComponent } from './image-catalogue.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [ ImageCatalogueComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class ImageCatalogueModule { }
