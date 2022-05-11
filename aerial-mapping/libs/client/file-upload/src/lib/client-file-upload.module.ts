import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FileUploadRoutingModule
  ],
  declarations: [FileUploadComponent],
})
export class ClientFileUploadModule {}
