import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCatalogueComponent } from './image-catalogue.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterModule } from '../shared/footer/footer.module';


@NgModule({
  declarations: [ ImageCatalogueComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FooterModule,
    MatSnackBarModule
  ]
})
export class ImageCatalogueModule { }
