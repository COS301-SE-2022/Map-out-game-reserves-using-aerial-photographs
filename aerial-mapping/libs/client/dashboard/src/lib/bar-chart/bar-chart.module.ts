import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from './bar-chart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';

@NgModule({
  imports: [
    CommonModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  declarations: [BarChartComponent],
  providers: [HttpClient],
  exports: [BarChartComponent]
})
export class BarChartModule {}
