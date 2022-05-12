import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewModule }  from './dashboard-view/dashboard-view.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BarChartModule } from './bar-chart/bar-chart.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
    MatListModule,
    HttpClientModule,
    BarChartModule,
    DashboardViewModule
  ],
  declarations: [],
  providers: [ HttpClient ]
})
export class ClientDashboardModule {}
