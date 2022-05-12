import { Component, OnInit } from '@angular/core';
import { faCamera as camera } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle as warning } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle as error } from '@fortawesome/free-solid-svg-icons';
import { faCheck as good } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as complete } from '@fortawesome/free-solid-svg-icons';
import { faSpinner as progress } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '../bar-chart/bar-chart.model';
import { ClientApiService } from '../../../../shared/services/client-api.service';

@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit{
  videoCollectionsData: Video_Collection[] = [];
  pastWeek: number[];
  total: number;
  public messages: Array<any>;
  public inProgress: Array<any>;
  public photos: Array<BarChart>;

  camera = camera;
  error = error;
  warning = warning;
  good = good;
  complete = complete;
  progress = progress;

  count = 0;
  d = new Date().getDay();

  constructor(private apiService:ClientApiService) {
    this.pastWeek = [3, 5, 2, 3, 2, 1, 7];
    this.total = 0;
    this.pastWeek.forEach(element => {
      this.total+=element;
    });
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

    this.inProgress = [
      {
        name: 'Upload 77',
      },
      {
        name: 'Upload 78',
      },
      {
        name: 'Upload 79',
      },
      {
        name: 'Upload 80',
      },
      {
        name: 'Upload 81',
      },
      {
        name: 'Upload 82',
      },
      {
        name: 'Upload 83',
      },
      {
        name: 'Upload 84',

      },{
        name: 'Upload 85',
      },
      {
        name: 'Upload 86',
      },
      {
        name: 'Upload 87',
      },
      {
        name: 'Upload 88',
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

  ngOnInit(): void {
    //make API call to access status of resources for particular company
    this.apiService.getVideoCollections().subscribe({
      next: (_res) => {
        this.videoCollectionsData = _res.data.getVideoCollections;
        console.log(this.videoCollectionsData);
      },
      error: (err) => { console.log(err); }
    });
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

interface  Video_Collection {
  collectionID: number;
  parkID: number;
  upload_date_time: Date;
}
