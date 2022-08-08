import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
