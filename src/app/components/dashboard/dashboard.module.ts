import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FooterModule } from '../shared/footer/footer.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';


@NgModule({
  declarations: [DashboardComponent, BarChartComponent, MapboxComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    MatSnackBarModule,
    NavbarModule,
    FooterModule,
    NgChartsModule,
    SpinnerModule
  ]
})
export class DashboardModule { }
