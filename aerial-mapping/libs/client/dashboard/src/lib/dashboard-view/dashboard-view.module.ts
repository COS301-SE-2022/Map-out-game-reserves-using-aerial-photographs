import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { DashboardViewComponent } from './dashboard-view.component';
import { BarChartModule } from '../bar-chart/bar-chart.module';
import { MatListModule } from '@angular/material/list';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
    HttpClientModule,
    BarChartModule,
    ComponentsNavbarModule,
    MatListModule
  ],
  declarations: [DashboardViewComponent],
  providers: [HttpClient, NgChartsModule]
})
export class DashboardViewModule {}
