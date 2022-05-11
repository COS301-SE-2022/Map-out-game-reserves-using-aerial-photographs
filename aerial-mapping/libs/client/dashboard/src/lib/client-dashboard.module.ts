import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsNavbarModule } from './../../../shared/components/navbar/src/lib/client-shared-components-navbar.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsNavbarModule
  ],
  declarations: [DashboardViewComponent],
})
export class ClientDashboardModule {}
