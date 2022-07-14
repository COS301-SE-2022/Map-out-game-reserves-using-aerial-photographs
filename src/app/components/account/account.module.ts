import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AccountComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
