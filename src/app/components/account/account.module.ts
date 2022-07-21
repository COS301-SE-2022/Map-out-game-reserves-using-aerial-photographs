import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { NameDialogComponent } from './name-dialog/name-dialog.component';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';
import { RegisterLinkDialogComponent } from './register-link-dialog/register-link-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [ AccountComponent, PasswordDialogComponent, NameDialogComponent, EmailDialogComponent, RegisterLinkDialogComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AccountModule { }
