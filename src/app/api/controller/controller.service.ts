import { Injectable } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';
import { CreateUserInput, ImageCollection, User } from 'src/app/API.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  collectionData: ImageCollection[] = [];
  errorState: boolean = false;
  websocket: WebSocket | null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
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
      this.websocket!.send(JSON.stringify({
        message: "subscribe", //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
        topic: "maps" //this is the topic we want to subscribe to
      }));
    }
  }

  //opens the web socket and handles requests on it
  configWebSocket() {
    this.websocket = null;
    this.websocket = new WebSocket("wss://ha3u3iiggc.execute-api.sa-east-1.amazonaws.com/production/");
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
      console.log("Websocket connection closed - in configWebSocket()");
      setTimeout(this.configWebSocket, 250); //reopen websocket in 250ms
    }
    this.websocket.onopen = () => {
      console.log("Websocket connection opened");
      this.websocket!.send(JSON.stringify({
        message: "subscribe", //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
        topic: "maps" //this is the topic we want to subscribe to
      }));
    }
  }

  //sends a registration email to the specified recipient
  invokeEmailLambda(email: string) {
    const body = {
      email: email
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('https://uuxpw2hgzb.execute-api.sa-east-1.amazonaws.com/development', JSON.stringify(body), { headers: headers });
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
    return this.http.post('https://r3lz6pzaj9.execute-api.sa-east-1.amazonaws.com/development/', JSON.stringify(body), { headers: headers });
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

  //uploads files to our s3 bucket
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

  //deletes files from our s3 bucket
  async S3delete(collection:string){
    try {
      const result = await Storage.remove(collection);
      console.log(21, result);
    } catch(e) {
      console.log("S3delete error: ", e);
    }
  };

  //downloads files from our s3 bucket
  async S3download(fileKey:string, collection:string, folder:string, fetch_data:boolean){
    const result = await Storage.get(collection+"/"+folder+"/"+fileKey, { download: fetch_data });
    return result;
  };
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


