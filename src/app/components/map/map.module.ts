import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [ MapComponent, SafePipe ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    NavbarModule,
    FooterModule,
    MatSnackBarModule
  ]
})
export class MapModule { }
