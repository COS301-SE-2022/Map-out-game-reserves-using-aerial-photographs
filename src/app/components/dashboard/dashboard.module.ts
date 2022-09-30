import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterModule } from '../shared/footer/footer.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent, MapboxComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatSnackBarModule,
    NavbarModule,
    FooterModule,
    NgChartsModule,
    SpinnerModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
