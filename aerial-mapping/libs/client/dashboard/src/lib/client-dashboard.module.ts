import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsNavbarModule } from './../../../shared/components/navbar/src/lib/client-shared-components-navbar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
  ],
  declarations: [DashboardViewComponent, BarChartComponent],
})
export class ClientDashboardModule {}
