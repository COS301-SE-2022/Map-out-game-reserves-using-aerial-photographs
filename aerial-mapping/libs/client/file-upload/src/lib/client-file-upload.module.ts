import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import {MatCardModule} from '@angular/material/card';
import { ComponentsNavbarModule } from './../../../shared/components/navbar/src/lib/client-shared-components-navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    MatCardModule,
    ComponentsNavbarModule
  ],
  declarations: [FileUploadComponent],
})
export class ClientFileUploadModule {}
