import { Component, OnInit } from '@angular/core';
import { faMap as mapIcon } from '@fortawesome/free-solid-svg-icons';
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
  collectionData: Image_Collection[] = [];
  completed: Image_Collection[] = [];
  processing: Image_Collection[] = [];

  messagesData: Message[] = [];
  messages: Dashboard_Message[] = [];

  total: number;
  public maps!: Array<BarChart>;

  mapIcon = mapIcon;
  error = error;
  warning = warning;
  good = good;
  complete = complete;
  progress = progress;

  values = [3, 5, 2, 3, 2, 1, 7, 4];

  constructor(private apiService:ClientApiService) {
    this.maps = [
      {Value: this.values[0]},
      {Value: this.values[1]},
      {Value: this.values[2]},
      {Value: this.values[3]},
      {Value: this.values[4]},
      {Value: this.values[5]},
      {Value: this.values[6]},
      {Value: this.values[7]}
    ];
    console.log("Maps: ",this.maps);
    this.total = 0;
    this.maps.forEach(element => {
      this.total+=element.Value;
    });
  }

  ngOnInit(): void {
    this.apiService.getImageData(1).subscribe({
      next: (_res) => {
        console.log(_res);
      },
      error: (err) => { console.log(err); }
    });
    //make API call to access status of resources for particular company
    this.apiService.getImageCollections().subscribe({
      next: (_res) => {
        this.collectionData = _res.data.getImageCollections;

        let completed_count = 0;
        let processing_count = 0;
        for(let i = 0; i< this.collectionData.length;i++){
          if(this.collectionData[i].completed){
            this.completed[completed_count] = this.collectionData[i];
            completed_count++;
          }
          else{
            this.processing[processing_count] = this.collectionData[i];
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
}

interface  Image_Collection {
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
