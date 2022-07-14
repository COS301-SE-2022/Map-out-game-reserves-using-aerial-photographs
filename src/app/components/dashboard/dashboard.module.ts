import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [DashboardComponent, BarChartComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatListModule,
    NavbarModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
