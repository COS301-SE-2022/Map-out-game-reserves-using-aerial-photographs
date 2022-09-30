import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterModule } from '../shared/footer/footer.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    FooterModule,
    ReactiveFormsModule,
    MatSnackBarModule, 
    SpinnerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class LoginModule { }
