import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterModule } from '../shared/footer/footer.module';


@NgModule({
  declarations: [ FileUploadComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    MatProgressBarModule,
    FooterModule,
    MatSnackBarModule
  ]
})
export class FileUploadModule { }
