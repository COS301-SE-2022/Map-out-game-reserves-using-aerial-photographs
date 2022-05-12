import { Component, OnInit, Input } from '@angular/core';
import { BarChart } from './bar-chart.model';

@Component({
  selector: 'aerial-mapping-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input()
  List!: Array<BarChart>;

  public Total = 0;
  public largest = 0;


  // constructor() { }

  ngOnInit(): void {
    this.Chart();
  }

  Chart() {
    if(this.List){
      this.List.forEach((element) => {
        this.Total += element.Value;
        if (this.largest < element.Value){
          this.largest = element.Value;
        }
      });
    }

    if(this.List)
    {
      this.List.forEach((element) => {
        element.Size =
          Math.round((element.Value * 100) / this.largest) + '%';
      });
    }
  }
}
