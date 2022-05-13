import { Component, OnInit } from '@angular/core';
import { faCamera as camera, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle as warning } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle as error } from '@fortawesome/free-solid-svg-icons';
import { faCheck as good } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as complete } from '@fortawesome/free-solid-svg-icons';
import { faSpinner as progress } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '../bar-chart/bar-chart.model';
import { ClientApiService } from '@aerial-mapping/client/shared/services';
//import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'aerial-mapping-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit{
  videoCollectionsData: Video_Collection[] = [];
  completed: Video_Collection[] = [];
  processing: Video_Collection[] = [];

  messagesData: Message[] = [];
  messages: Dashboard_Message[] = [];

  pastWeek: number[];
  total: number;
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

        let completed_count = 0;
        let processing_count = 0;
        for(let i = 0; i< this.videoCollectionsData.length;i++){
          if(this.videoCollectionsData[i].completed){
            this.completed[completed_count] = this.videoCollectionsData[i];
            completed_count++;
          }
          else{
            this.processing[processing_count] = this.videoCollectionsData[i];
            processing_count++;
          }
        }

      },
      error: (err) => { console.log(err); }
    });

    this.apiService.getMessages().subscribe({
      next: (_res) => {
        this.messagesData = _res.data.getMessages;

        for(let i = 0; i< this.messagesData.length;i++){
          let status = good;
          let status_color = 'green-icon'
          if(this.messagesData[i].message_status == "warning"){
              status = warning;
              status_color = 'orange-icon'
          }
          else if(this.messagesData[i].message_status == "alert"){
              status = error;
              status_color = 'red-icon'
          }

          this.messages[i] = {
            message_status: status,
            color: status_color,
            message_description: this.messagesData[i].message_description,
            collectionID: this.messagesData[i].collectionID
          }
        }

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
  // upload_date_time: DateTime
  completed: boolean;
}

interface Message{
  message_status: string,
  message_description: string,
  collectionID: number
}

class Dashboard_Message{
  message_status = good;
  color = 'green-icon';
  message_description = "";
  collectionID = 0;
}
