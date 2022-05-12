import { Component } from '@angular/core';
import { faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle as warning } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle as error } from '@fortawesome/free-solid-svg-icons';
import { faCheck as good } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as complete } from '@fortawesome/free-solid-svg-icons';
import { faSpinner as progress } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '../bar-chart/bar-chart.model';

@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  pastWeek: number[];
  total: number;
  public messages: Array<any>;
  public completed: Array<any>;
  // public inProgress: Array<any>;
  public photos: Array<BarChart>;

  camera = camera;
  error = error;
  warning = warning;
  good = good;
  complete = complete;
  progress = progress;

  count = 0;
  d = new Date().getDay();

  constructor() {
    this.pastWeek = [3, 5, 2, 3, 2, 1, 7];
    this.total = 253;
    this.messages = [
      {
        message: 'Everything is good',
        icon: good,
        color: 'green-icon',
        date: "Today"
      },
      {
        message: 'System is slower than usual',
        icon: warning,
        color: 'orange-icon',
        date: "Yesterday"
      },
      {
        message: 'Everything is good',
        icon: good,
        color: 'green-icon',
        date: "10 May"
      },
      {
        message: 'Fire Detected',
        icon: error,
        color: 'red-icon',
        date: "9 May"
      },
      {
        message: 'Unknown objects in image',
        icon: warning,
        color: 'orange-icon',
        date: "8 May"
      },
    ];
    this.completed = [
      {
        name: 'Everything is good',
        date: "Today"
      },
      {
        name: 'System is slower than usual',
        date: "Yesterday"
      },
      {
        name: 'Everything is good',
        date: "10 May"
      },
      {
        name: 'Fire Detected',
        date: "9 May"
      },
      {
        name: 'Unknown objects in image',
        date: "8 May"
      },
      {
        name: 'Unknown objects in image',
        date: "8 May"
      },
      {
        name: 'Unknown objects in image',
        date: "8 May"
      },
      {
        name: 'Unknown objects in image',
        date: "8 May"
      },
    ];
    this.photos = [
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
      {
        Value: this.pastWeek[this.count++],
        Size: '',
        Legend: this.getDayOfWeek(),
      },
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
