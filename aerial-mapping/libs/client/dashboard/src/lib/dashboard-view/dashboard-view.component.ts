import { Component } from '@angular/core';
import { faPaperPlane as plane } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '../bar-chart/bar-chart.model';

@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  //Values from API
  pastWeek = [3, 5, 2, 3, 2, 1, 7]; //From a week ago - today
  total = 253;

  plane = plane;

  count = 0;

  public flights: Array<BarChart> = [
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
    { Value: this.pastWeek[this.count++], Size: '', Legend: getDayOfWeek() },
  ];
}

let d = new Date().getDay();

function getDayOfWeek(): string{
  if (d == new Date().getDay() - 1){
    d++;
    return "Today";
  }
  const weekday = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  if (d == 6){
    d = d - 6;
    return weekday[6];
  } else {
    return weekday[d++];
  }
}