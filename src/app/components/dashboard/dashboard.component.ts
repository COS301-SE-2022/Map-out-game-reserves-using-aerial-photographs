import { Component, OnInit } from '@angular/core';
import {
  faMap as mapIcon,
  faExclamationTriangle as warning,
  faExclamationCircle as error,
  faCheck as good,
  faCheckCircle as complete,
  faSpinner as progress,
} from '@fortawesome/free-solid-svg-icons';
import { BarChart } from './bar-chart/bar-chart.model';
import {
  APIService,
  ListImageCollectionsQuery,
  ImageCollection,
  ListMessagesQuery,
  CreateMessageInput,
} from 'src/app/API.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControllerService } from 'src/app/api/controller/controller.service';

@Component({
  selector: 'aerial-mapping-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'dashboard-component';

  collectionData: ImageCollection[] = [];
  completed: ImageCollection[] = [];
  processing: ImageCollection[] = [];

  messagesData: CreateMessageInput[] = [];
  messages: Dashboard_Message[] = [];

  total: number;
  errorState: boolean = false;
  public maps!: Array<BarChart>;

  // font awesome icons
  mapIcon = mapIcon;
  error = error;
  warning = warning;
  good = good;
  complete = complete;
  progress = progress;

  values = [3, 5, 2, 3, 2, 1, 7, 4];

  inAnimation: boolean;

  constructor(
    private api: APIService,
    private controller: ControllerService,
    private snackbar: MatSnackBar
  ) {
    //loader
    this.inAnimation = false;
    this.fadeOut();

    //TODO integrate this bar chart with real data
    this.maps = [
      { Value: this.values[0] },
      { Value: this.values[1] },
      { Value: this.values[2] },
      { Value: this.values[3] },
      { Value: this.values[4] },
      { Value: this.values[5] },
      { Value: this.values[6] },
      { Value: this.values[7] },
    ];
    this.total = 0;
    this.maps.forEach((element) => {
      this.total += element.Value;
    });
  }

  ngOnInit(): void {
    this.refreshDashboard();

    // refresh map collections and messages when a notification is received from the websocket
<<<<<<< HEAD
    if(this.controller.websocket != null){
      this.controller.websocket.onmessage = (msg: any) => {
        console.log('SNS message received ', msg);
        this.refreshDashboard();
      };
    }
=======
    this.controller.websocket.onmessage = (msg: any) => {
      console.log('SNS message received ', msg);
      this.refreshDashboard();
    };
>>>>>>> 8eb2eeaf5388e2540ea25e3be04f5ae71f3e05d8

    //poll DynamoDB (OLD)
    // this.statusPollingInterval = interval(5000)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => this.api.ListImageCollections())
    //   ).subscribe({
    //     next: async (collections: ListImageCollectionsQuery) => {
    //       console.log("[DASHBOARD] Polling collections from DynamoDB...");
    //       this.completed = [];
    //       this.processing = [];
    //       for (const collection of collections.items) {
    //         if (collection) {
    //           if (collection.completed) {
    //             this.completed.push(collection);
    //           }
    //           else if (collection.pending) {
    //             this.processing.push(collection);
    //           }
    //         }
    //       }
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //       if (err.errors[0].message == "Network Error") {
    //         if (!this.errorState) {
    //           this.errorState = true;
    //           this.snackbar.open("Network error...", "❌", { verticalPosition: 'top' });
    //         }
    //       }
    //     }
    //   })

    // this.messagePollingInterval = interval(5000)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => this.api.ListMessages())
    //   ).subscribe({
    //     next: (messages: ListMessagesQuery) => {
    //       console.log("[DASHBOARD] Listing Messages:", messages)
    //       if (messages.items.length != 0) {
    //         console.log(messages);
    //         this.messagesData = [];
    //         this.messages = [];
    //         for (const element of messages.items) {
    //           if (element) {
    //             //not creating a message, just using CreateMessageInput as an interface here
    //             const msg: CreateMessageInput = {
    //               message_status: element.message_status,
    //               message_description: element.message_description,
    //               collectionID: element.collectionID,
    //               messageID: element.messageID
    //             }
    //             this.messagesData.push(msg)
    //           }
    //         }
    //         for (let i = 0; i < this.messagesData.length; i++) {
    //           let status = good;
    //           let status_color = 'green-icon';
    //           if (this.messagesData[i].message_status?.toLowerCase() == 'warning') {
    //             status = warning;
    //             status_color = 'orange-icon';
    //           } else if (this.messagesData[i].message_status?.toLowerCase() == 'error') {
    //             status = error;
    //             status_color = 'red-icon';
    //           }
    //           this.messages[i] = {
    //             message_status: status,
    //             color: status_color,
    //             message_description: this.messagesData[i].message_description,
    //             collectionID: this.messagesData[i].collectionID,
    //           };
    //         }
    //       }

    //       return -1;
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //       return -1;
    //     }
    //   });
  }

  refreshDashboard() {
    // get all map collections from DynamoDB - and check statuses of each one.
    this.api
      .ListImageCollections()
      .then((resp: ListImageCollectionsQuery) => {
        this.completed = [];
        this.processing = [];
        for (const collection of resp.items) {
          if (collection) {
            if (collection.completed) {
              this.completed.push(collection);
            } else if (collection.pending) {
              this.processing.push(collection);
            }
          }
        }
      })
      .catch((err: any) => {
        if (err.errors[0].message == 'Network Error') {
          if (!this.errorState) {
            this.errorState = true;
            this.snackbar.open('Network error...', '❌', {
              verticalPosition: 'top',
            });
          }
        }
      });

    // get all the messages from DynamoDB - check each message's status
    this.api
      .ListMessages()
      .then((messages: ListMessagesQuery) => {
        if (messages.items.length != 0) {
          this.messagesData = [];
          this.messages = [];
          for (const element of messages.items) {
            if (element) {
              //not creating a message, just using CreateMessageInput as an interface here
              const msg: CreateMessageInput = {
                message_status: element.message_status,
                message_description: element.message_description,
                collectionID: element.collectionID,
                messageID: element.messageID,
              };
              this.messagesData.push(msg);
            }
          }
          for (let i = 0; i < this.messagesData.length; i++) {
            let status = good;
            let status_color = 'green-icon';
            if (
              this.messagesData[i].message_status?.toLowerCase() == 'warning'
            ) {
              status = warning;
              status_color = 'orange-icon';
            } else if (
              this.messagesData[i].message_status?.toLowerCase() == 'error'
            ) {
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
      })
      .catch((err: any) => {
        if (err.errors[0].message == 'Network Error') {
          if (!this.errorState) {
            this.errorState = true;
            this.snackbar.open('Network error...', '❌', {
              verticalPosition: 'top',
            });
          }
        }
      });
  }

  fadeOut() {
    if (!this.inAnimation) {
      this.inAnimation = true;
      document.addEventListener('readystatechange', (event) => {
        if (document.readyState === 'complete') {
          const loader = document.getElementById('pre-loader');
          loader!.setAttribute('class', 'fade-out');
          let count = 0;
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
    }
  }
  dismiss():void {
    //TODO: dismiss message = true
  }
}

class Dashboard_Message {
  message_status = good;
  color = 'green-icon';
  message_description: string | null | undefined = '';
  collectionID: string | null | undefined = '';
}
