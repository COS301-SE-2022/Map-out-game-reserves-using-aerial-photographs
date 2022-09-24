import { Injectable } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';
import { CreateUserInput, ImageCollection, User } from 'src/app/API.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  collectionData: ImageCollection[] = [];
  errorState: boolean = false;
  websocket: WebSocket | null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    // open client WebSocket
    this.websocket = new WebSocket(
      'wss://ha3u3iiggc.execute-api.sa-east-1.amazonaws.com/production/'
    );
    this.websocket.onmessage = (msg: any) => {
      msg = JSON.parse(msg);
      if (msg.status == 'error') {
        this.snackBar.open(
          `Failed to process collectionID: ${msg.collectionID}`,
          '❌',
          { verticalPosition: 'top', duration: 3000 }
        );
      } else {
        this.snackBar.open(`New map stitching job (${msg}) completed.`, '✔️', {
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    };
    this.websocket.onclose = () => {
      setTimeout(this.configWebSocket, 250); //reopen websocket in 250ms
    };
    this.websocket.onopen = () => {
      this.websocket!.send(
        JSON.stringify({
          message: 'subscribe', //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
          topic: 'maps', //this is the topic we want to subscribe to
        })
      );
    };
  }

  //sets up web socket to interact with WEB ODM
  configWebSocket() {
    this.websocket = null;
    this.websocket = new WebSocket(
      'wss://ha3u3iiggc.execute-api.sa-east-1.amazonaws.com/production/'
    );
    this.websocket.onmessage = (msg: any) => {
      msg = JSON.parse(msg);
      if (msg.status != null && msg.status == 'error') {
        this.snackBar.open(
          `Failed to process collectionID: ${msg.collectionID}`,
          '❌',
          { verticalPosition: 'top', duration: 3000 }
        );
      } else {
        this.snackBar.open(`New map stitching job (${msg}) completed.`, '✔️', {
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    };
    this.websocket.onclose = () => {
      setTimeout(this.configWebSocket, 250); //reopen websocket in 250ms
    };
    this.websocket.onopen = () => {
      this.websocket!.send(
        JSON.stringify({
          message: 'subscribe', //this selects the 'subscribe' API Gateway route (which triggers the onSubscribe lambda function)
          topic: 'maps', //this is the topic we want to subscribe to
        })
      );
    };
  }

  //calls 'protected-signup' lambda function and tries to register user (if an invite exists)
  tryRegister(u: CreateUserInput): Observable<any> {
    const body = {
      username: u.user_email,
      password: u.user_password,
      name: u.user_name,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      'https://r3lz6pzaj9.execute-api.sa-east-1.amazonaws.com/development',
      JSON.stringify(body),
      { headers: headers }
    );
  }

  //signs the newly registered student in
  async finishRegistration(u: User): Promise<number> {
    //success
    try {
      await Auth.signIn(u.user_email!, u.user_password!);
      return 1; //for testing purposes
    } catch (error) {
      console.log('[CLIENT] error signing in:', error);
      return -1; //for testing purposes
    }
  }

  //uploads files to s3 bucket
  async S3upload(
    fileKey: string,
    collection: string,
    folder: string,
    fileData: File,
    dataType: string
  ) {
    try {
      const result = await Storage.put(
        collection + '/' + folder + '/' + fileKey,
        fileData,
        {
          contentType: dataType,
        }
      );
    } catch (e) {
      console.log('S3upload error: ', e);
    }
  }

  //downloads files from s3 bucket
  async S3download(
    fileKey: string,
    collection: string,
    folder: string,
    fetch_data: boolean
  ) {
    const result = await Storage.get(
      collection + '/' + folder + '/' + fileKey,
      { download: fetch_data }
    );
    return result;
  }

  //deletes files from s3 bucket
  async S3delete(collection: string) {
    try {
      await Storage.remove(collection);
    } catch (e) {
      console.log('S3delete error: ', e);
    }
  }
}

// Interfaces
export interface WebODMProject {
  created_at: string;
  id: number;
  description: string;
  name: string;
}

export interface WebODMProjectsResponse extends Array<WebODMProject> {}

export interface WebODMCreateTaskResponse {
  id: string;
  description: string;
}
