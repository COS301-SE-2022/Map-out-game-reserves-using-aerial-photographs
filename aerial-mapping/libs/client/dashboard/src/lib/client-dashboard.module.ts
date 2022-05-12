import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
    MatListModule,
  ],
  declarations: [DashboardViewComponent, BarChartComponent],
})
export class ClientDashboardModule {}
