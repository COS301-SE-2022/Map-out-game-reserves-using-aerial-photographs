import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMap as mapIcon, faExclamationTriangle as warning, faExclamationCircle as error, faCheck as good, faCheckCircle as complete, faSpinner as progress,  } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from './bar-chart/bar-chart.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { APIService, ListImageCollectionsQuery, ImageCollection, ListMessagesQuery, CreateMessageInput } from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'aerial-mapping-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  collectionData: ImageCollection[] = [];
  completed: ImageCollection[] = [];
  processing: ImageCollection[] = [];

  messagesData: CreateMessageInput[] = [];
  messages: Dashboard_Message[] = [];

  total: number;
  errorState: boolean = false;
  public maps!: Array<BarChart>;
  statusPollingInterval: Subscription;
  messagePollingInterval: Subscription;

  mapIcon = mapIcon;
  error = error;
  warning = warning;
  good = good;
  complete = complete;
  progress = progress;

  values = [3, 5, 2, 3, 2, 1, 7, 4];

  constructor(private apiController: ControllerService, private sanitizer: DomSanitizer, private api:APIService, private snackbar: MatSnackBar) {
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
    this.statusPollingInterval = new Subscription();
    this.messagePollingInterval = new Subscription();
  }

  ngOnInit(): void {
//     // --------------------still to do----------------------
//     // this.apiService.getImageData("bucket name", "file name").subscribe({
//     //   next: (blob) => {
//     //     const obj = new Image();
//     //     obj.src = URL.createObjectURL(blob);
//     //     // document.getElementById('outer')?.appendChild(obj);

//     //     console.log(blob);
//     //     console.log(obj.src);
//     //   },
//     //   error: (err) => { console.log(err); }
//     // });

    //poll DynamoDB
    this.statusPollingInterval = interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.api.ListImageCollections())
    ).subscribe({
      next: async (collections: ListImageCollectionsQuery) => {
        console.log("[DASHBOARD] Polling collections from DynamoDB...");
        let completed_count = 0;
        let processing_count = 0;
        this.completed = [];
        this.processing = [];
        for(const collection of collections.items){
          if(collection){
            if(collection.completed){
              this.completed[completed_count] = collection;
              completed_count++;
            }
            else if(collection.pending) {
              this.processing[processing_count] = collection;
              processing_count++;
            }
          }
        }
      },
      error: (err: any) => {
        console.log(err);
        if(err.errors[0].message == "Network Error"){
          if(!this.errorState){
            this.errorState = true;
            this.snackbar.open("Network error...", "❌", { verticalPosition: 'top' });
          }
        }
      }
    })

    this.messagePollingInterval = interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.api.ListMessages())
    ).subscribe({
      next: (messages: ListMessagesQuery) => {
        if (messages.items.length != 0) {
          console.log("[DASHBOARD] Listing Messages:", messages)
          console.log(messages);
          this.messagesData = [];
          this.messages = [];
          for (const element of messages.items) {
            if(element){
              //not creating a message, just using CreateMessageInput as an interface here
              const msg: CreateMessageInput = {
                message_status: element.message_status,
                message_description: element.message_description,
                collectionID: element.collectionID,
                messageID: element.messageID
              }
              this.messagesData.push(msg)
            }
          }
          for (let i = 0; i < this.messagesData.length; i++) {
            let status = good;
            let status_color = 'green-icon';
            if (this.messagesData[i].message_status?.toLowerCase() == 'warning') {
              status = warning;
              status_color = 'orange-icon';
            } else if (this.messagesData[i].message_status?.toLowerCase() == 'error') {
              status = error;
              status_color = 'red-icon';
            }
            this.messages[i] = {
              message_status: status,
              color: status_color,
              message_description: this.messagesData[i].message_description,
              collectionID: this.messagesData[i].collectionID,
            };
          }
        }

        return -1;
      },
      error: (err: any) => {
        console.log(err);
        return -1;
      }
    })

    //make API call to access status of tasks
    // this.api.ListImageCollections().then(async (collections: ListImageCollectionsQuery) => {
    //   if (collections.items.length != 0) {
    //     console.log(collections.items[0]);
    //     // this.collectionData = collections.items.getImageCollections;
    //     let completed_count = 0;
    //     let processing_count = 0;
    //     for (const item of collections.items) {
    //       this.collectionData.push()
    //     }
    //     for (let collection of this.collectionData) {
    //       //for each collection, pull 'completed' and 'error' from DynamoDB table
    //       collection = await this.api.GetImageCollection(collection.collectionID).then((col: GetImageCollectionQuery) => {
    //         return col;
    //       });
    //       if(collection.completed){
    //         this.completed[completed_count] = collection;
    //         completed_count++;
    //       }
    //       else{
    //         this.processing[processing_count] = collection;
    //         processing_count++;
    //       }
    //     }
    //     console.log(completed_count);
    //     console.log(processing_count);
    //   }

    //   return -1;
    // }).catch((err)=> {
    //   if(err.errors[0].message == "Network Error"){
    //     this.snackbar.open("Network error...", "❌", { verticalPosition: 'top' });
    //   }

    //   return -1;
    // });

  }

  ngOnDestroy(): void {
    this.statusPollingInterval.unsubscribe();
    this.messagePollingInterval.unsubscribe();
  }
}

class Dashboard_Message{
  message_status = good;
  color = 'green-icon';
  message_description: string|null|undefined = "";
  collectionID: string|null|undefined = "";
}
