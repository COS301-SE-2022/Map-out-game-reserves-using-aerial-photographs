import { Component } from '@angular/core';
import { faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '../bar-chart/bar-chart.model';

@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  pastWeek: number[];
  total: number;
  public messages: string[];
  public photos: Array<BarChart>;

  camera = camera;

  count = 0;
  d = new Date().getDay();

  constructor() {
    this.pastWeek = [3, 5, 2, 3, 2, 1, 7];
    this.total = 253;
    this.messages = ["Everything is good", "System back online", "System has halted!!!"];
    this.photos = [
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
      { Value: this.pastWeek[this.count++], Size: '', Legend: this.getDayOfWeek() },
    ];
  }

  getDayOfWeek(): string {
    if (this.d == new Date().getDay() - 1) {
      this.d++;
      return 'Today';
    }
    const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (this.d == 6) {
      this.d = this.d - 6;
      return weekday[6];
    } else {
      return weekday[this.d++];
    }
  }
}
