import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ MapComponent ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule
  ]
})
export class MapModule { }
