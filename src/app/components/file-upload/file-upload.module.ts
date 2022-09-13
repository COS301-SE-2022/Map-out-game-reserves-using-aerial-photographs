import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterModule } from '../shared/footer/footer.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon'
import { ParksDialogComponent } from './parks-dialog/parks-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../shared/spinner/spinner.module';

@NgModule({
  declarations: [ FileUploadComponent, ParksDialogComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    MatProgressBarModule,
    FooterModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule, 
    SpinnerModule
  ]
})
export class FileUploadModule { }
