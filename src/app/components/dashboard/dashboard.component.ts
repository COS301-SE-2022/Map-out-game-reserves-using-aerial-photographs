import { Component, OnInit } from '@angular/core';
import { faMap as mapIcon, faExclamationTriangle as warning, faExclamationCircle as error, faCheck as good, faCheckCircle as complete, faSpinner as progress,  } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from './bar-chart/bar-chart.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { APIService } from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'aerial-mapping-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
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

  constructor(private api:APIService, private snackbar: MatSnackBar) {
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
    // this.api.SearchImageCollections();
    //--------------------still to do----------------------
    // this.apiService.getImageData("bucket name", "file name").subscribe({
    //   next: (blob) => {
    //     const obj = new Image();
    //     obj.src = URL.createObjectURL(blob);
    //     // document.getElementById('outer')?.appendChild(obj);

    //     console.log(blob);
    //     console.log(obj.src);
    //   },
    //   error: (err) => { console.log(err); }
    // });


    //make API call to access status of resources for particular company
    this.api.ListImageCollections().then((event) => {
      if (event.items.length != 0) {
        console.log(event.items[0]);
        // this.collectionData = event.items.getImageCollections;
        let completed_count = 0;
        let processing_count = 0;
        for (let i = 0; i < event.items.length; i++) {
          const element = event.items[i];
          this.collectionData.push({collectionID: element?.collectionID, parkID: element?.parkID, completed: element?.completed})
        }
        for (let i = 0; i < this.collectionData.length; i++) {
          if(this.collectionData[i].completed){
            this.completed[completed_count] = this.collectionData[i];
            completed_count++;
          }
          else{
            this.processing[processing_count] = this.collectionData[i];
            processing_count++;
          }
        }
        console.log(completed_count);
        console.log(processing_count);
      }

      return -1;
    }).catch((err)=> {
      if(err.errors[0].message == "Network Error"){
        this.snackbar.open("Network error...", "❌", { verticalPosition: 'top' });
      }

      return -1;
    });
    // this.apiService.getImageCollections().subscribe({
    //   next: (_res) => {
    //     this.collectionData = _res.data.getImageCollections;

    //     let completed_count = 0;
    //     let processing_count = 0;
    //     for(let i = 0; i< this.collectionData.length;i++){
    //       if(this.collectionData[i].completed){
    //         this.completed[completed_count] = this.collectionData[i];
    //         completed_count++;
    //       }
    //       else{
    //         this.processing[processing_count] = this.collectionData[i];
    //         processing_count++;
    //       }
    //     }

    //   },
    //   error: (err) => { console.log(err); }
    // });

    this.api.ListMessages().then((event) => {
      if (event.items.length != 0) {
        console.log(event)
        // console.log(event.items[0]);
        for (let i = 0; i < event.items.length; i++) {
          const element = event.items[i];
          this.messagesData.push({message_status: element?.message_status, message_description: element?.message_description, collectionID: element?.messageImageCollectionId})
        }
        for (let i = 0; i < this.messagesData.length; i++) {
          let status = good;
          let status_color = 'green-icon';
          if (this.messagesData[i].message_status == 'warning') {
            status = warning;
            status_color = 'orange-icon';
          } else if (this.messagesData[i].message_status == 'alert') {
            status = error;
            status_color = 'red-icon';
          }
          this.messages[i] = {
            message_status: status,
            color: status_color,
            message_description: this.messagesData[i].message_description,
            collectionID: this.messagesData[i].collectionID,
          };

          console.log(this.messages[i]);
        }
      }

      return -1;
    }).catch(()=> {return -1;});
    // this.apiService.getMessages().subscribe({
    //   next: (_res) => {
    //     this.messagesData = _res.data.getMessages;

    //     for(let i = 0; i< this.messagesData.length;i++){
    //       let status = good;
    //       let status_color = 'green-icon'
    //       if(this.messagesData[i].message_status == "warning"){
    //           status = warning;
    //           status_color = 'orange-icon'
    //       }
    //       else if(this.messagesData[i].message_status == "alert"){
    //           status = error;
    //           status_color = 'red-icon'
    //       }

    //       this.messages[i] = {
    //         message_status: status,
    //         color: status_color,
    //         message_description: this.messagesData[i].message_description,
    //         collectionID: this.messagesData[i].collectionID
    //       }
    //     }

    //   },
    //   error: (err) => { console.log(err); }
    // });
  }
}

interface  Image_Collection {
  collectionID: string|null|undefined;
  parkID: string|null|undefined;
  // upload_date_time: DateTime
  completed: boolean|null|undefined;
}

interface Message{
  message_status: string|null|undefined,
  message_description: string|null|undefined,
  collectionID: string|null|undefined
}

class Dashboard_Message{
  message_status = good;
  color = 'green-icon';
  message_description: string|null|undefined = "";
  collectionID: string|null|undefined = "";
}
