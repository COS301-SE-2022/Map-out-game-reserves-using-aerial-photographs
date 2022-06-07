import { Component, Input } from '@angular/core';
import { BarChart } from './bar-chart.model';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'aerial-mapping-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  @Input()
  List!: Array<BarChart>;

  barChartData: ChartData<'bar'> = {
    labels: ['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8'],
    datasets: [
      { data: [33, 33, 33, 44, 55, 33, 22, 11] }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stitched Map Count For The Last 8 Weeks',
      }
    }
  };

}
