import { Component, Input, OnInit } from '@angular/core';
import { BarChart } from './bar-chart.model';
import { ChartOptions, ChartData } from 'chart.js';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'aerial-mapping-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input()
  List!: Array<BarChart>;

  values: number[] = [];

  barChartData: ChartData<'bar'> | undefined;
  barChartOptions: ChartOptions | undefined;

  ngOnInit(): void {
    this.Chart();
  }

  Chart() {
    if (this.List) {
      this.List.forEach((element) => {
        this.values.push(element.Value);
      });

      this.barChartData = {
        labels: [
          'week 1',
          'week 2',
          'week 3',
          'week 4',
          'week 5',
          'week 6',
          'week 7',
          'week 8',
        ],
        datasets: [
          {
            label: '# of Maps',
            data: this.values,
            borderWidth: 0,
            hoverBorderWidth: 1,
            borderRadius: 3,
            // hoverBorderColor: "#12172a",
            // hoverBackgroundColor: "#12172a",
            // backgroundColor: "#12172a",
            backgroundColor: '#757575',
            hoverBackgroundColor: '#757575',
            hoverBorderColor: '#757575',
          },
        ],
      };

      this.barChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Stitched Map Count For The Last 8 Weeks',
          },
        },
      };
    }
  }
}
