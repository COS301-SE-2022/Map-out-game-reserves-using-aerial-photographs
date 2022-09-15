import { Injectable } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';
import { APIService, CreateUserInput, GetImageCollectionByTaskIdQuery, ImageCollection, UpdateImageCollectionInput, User } from 'src/app/API.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  //@ViewChild('formElem') formElem!: ElementRef<HTMLFormElement>;
  collectionData: ImageCollection[] = [];
  errorState: boolean = false;
  websocket: WebSocket;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    // open client WebSocket
    this.websocket = new WebSocket("wss://ha3u3iiggc.execute-api.sa-east-1.amazonaws.com/production/");
    this.websocket.onmessage = (msg: any) => {
      console.log("SNS Message Received");
      msg = JSON.parse(msg);
      if(msg.status == 'error') {
        this.snackBar.open(`Failed to process collectionID: ${msg.collectionID}`, "❌", { verticalPosition: 'top', duration: 3000 });
      }
      else {
        this.snackBar.open(`New map stitching job (${msg}) completed.`, "✔️", { verticalPosition: 'top', duration: 3000 });
      }
    }
    this.websocket.onclose = () => {
      console.log("Websocket connection closed");
      setTimeout(this.configWebSocket, 250); //reopen websocket in 250ms
    }
    this.websocket.onopen = () => {
      console.log("Websocket connection opened");
      this.websocket.send(JSON.stringify({
        message: "subscribe", //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
        topic: "maps" //this is the topic we want to subscribe to
      }));
    }
  }

  configWebSocket() {
    this.websocket = new WebSocket("wss://ha3u3iiggc.execute-api.sa-east-1.amazonaws.com/production/");
    this.websocket.onopen = () => {
      console.log("Websocket connection opened");
      this.websocket.send(JSON.stringify({
        message: "subscribe", //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
        topic: "maps" //this is the topic we want to subscribe to
      }));
    }
    this.websocket.onmessage = (msg: any) => {
      console.log("SNS Message Received");
      msg = JSON.parse(msg);
      if(msg.status != null && msg.status == 'error') {
        this.snackBar.open(`Failed to process collectionID: ${msg.collectionID}`, "❌", { verticalPosition: 'top', duration: 3000 });
      }
      else {
        this.snackBar.open(`New map stitching job (${msg}) completed.`, "✔️", { verticalPosition: 'top', duration: 3000 });
      }
    }
    this.websocket.onclose = () => {
      console.log("Websocket connection closed");
      setTimeout(this.configWebSocket, 250); //reopen websocket in 250ms
    }
  }

  //calls 'protected-signup' lambda function and tries to register user (if an invite exists)
  tryRegister(u: CreateUserInput): Observable<any> {
    console.log('[CLIENT] Trying to register user...');
    const body = {
      username: u.user_email,
      password: u.user_password,
      name: u.user_name
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('https://r3lz6pzaj9.execute-api.sa-east-1.amazonaws.com/development', JSON.stringify(body), { headers: headers });
  }

  async finishRegistration(u: User): Promise<number> {
    //success
    try {
      await Auth.signIn(u.user_email!, u.user_password!);
      return 1; //for testing purposes
    } catch (error) {
      console.log('[CLIENT] error signing in:', error);
      return -1;  //for testing purposes
    }
  }

  async S3upload(fileKey:string, collection:string, folder:string, fileData: File, dataType:string){
    try {
      const result = await Storage.put(collection+"/"+folder+"/"+fileKey, fileData, {
        contentType: dataType,
      });
      console.log(21, result);
    } catch(e) {
      console.log("S3upload error: ", e);
    }
  };

  async S3download(fileKey:string, collection:string, folder:string, fetch_data:boolean){
    // Storage.list('public/') // for listing ALL files without prefix, pass '' instead
    // .then(result => console.log(result))
    //console.log("sent: "+collection+"/"+folder+"/"+fileKey);
    const result = await Storage.get(collection+"/"+folder+"/"+fileKey, { download: fetch_data });
    //console.log(result);
    return result;
  }

  async getImageData(bucket_name: string, file_name: string): Promise<any> {
    // const options = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "image/png",
    //   }),
    // };

    return this.http.get(
      'https://3dxg59qzw5.execute-api.us-east-1.amazonaws.com/test_stage/' +
        bucket_name +
        '/' +
        file_name,
      {
        headers: { 'Content-Type': 'image/png' },
        responseType: 'json',
      }
    );
  }

  //------------------------------------------------------------------------
  //This is temporary code used to populate the database with temporary data
  /*async popMessage() {
    const newMessage: CreateMessageInput = {
      messageID: uuidv4(),
      message_status: "warning",
      message_description: "upload error",
      _version: 1,
      messageImageCollectionId: this.createCollection()
    }
    return this.repo.CreateMessage(newMessage)
          .then((event) => {
            alert('Successfully created!');
            return 1;
          })
          .catch((e) => {
            console.log('error creating message...', e);
            return -1;
          });
  }

  private createCollection():string {
    const newCollection: CreateImageCollectionInput = {
      collectionID: uuidv4(),
      parkID: this.createPark(),
      upload_date_time: "15/07/2022",
      completed: true,
      flightID: this.createFlight(),
      _version: 1
    }
    this.repo.CreateImageCollection(newCollection)
          .then((event) => {
            alert('Successfully created!');
            return 1;
          })
          .catch((e) => {
            console.log('error creating collection...', e);
            return -1;
          });
    return newCollection.collectionID;
  }

  private createPark():string {
    const newPark: CreateGameParkInput = {
      parkID: uuidv4(),
      park_name: "Rietvlei Nature Reserve",
      park_location: "25.8825° S, 28.2639° E",
      park_address: "4 Game Reserve Ave, Rietvallei 377-Jr, Pretoria, 0181",
      _version: 1
    }
    this.repo.CreateGamePark(newPark)
          .then((event) => {
            alert('Successfully created!');
            return 1;
          })
          .catch((e) => {
            console.log('error creating park...', e);
            return -1;
          });
    return newPark.parkID;
  }

  private createFlight():string {
    const newFlight: CreateFlightDetailsInput = {
      flightID: uuidv4(),
      flight_height: 500,
      flight_type: "Drone",
      pilotID: "049b98df-c0fa-465d-8dbe-2a0c78ef1654",
      _version: 1
    }
    this.repo.CreateFlightDetails(newFlight)
          .then((event) => {
            alert('Successfully created!');
            return 1;
          })
          .catch((e) => {
            console.log('error creating flight...', e);
            return -1;
          });
    return newFlight.flightID;
  }*/
}


// Interfaces

interface WebODMTokenResponse {
  token: string;
}

export interface WebODMProject {
  created_at: string;
  id: number;
  description: string;
  name: string;
}
export interface WebODMProjectsResponse extends Array<WebODMProject>{}

export interface WebODMCreateTaskResponse {
  id: string;
  description: string;
}

interface WebODMTask {
  id: string;
  images_count: number;
  name: string;
  status: number;
}
