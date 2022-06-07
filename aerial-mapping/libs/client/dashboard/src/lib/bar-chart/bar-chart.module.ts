import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from './bar-chart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsNavbarModule } from '@aerial-mapping/client/shared/components/navbar';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgChartsModule,
    CommonModule,
    ComponentsNavbarModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [BarChartComponent],
  providers: [HttpClient],
  exports: [BarChartComponent]
})
export class BarChartModule {}
