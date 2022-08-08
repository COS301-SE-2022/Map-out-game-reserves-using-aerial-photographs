import { Injectable, OnDestroy } from '@angular/core';
import { Amplify, Auth, Storage } from 'aws-amplify';
import { APIService, CreateMapInput, CreateMapMutation, CreateUserInput, GetImageCollectionByTaskIdQuery, ImageCollection, UpdateImageCollectionInput, User } from 'src/app/API.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Observable, startWith, Subject, Subscription, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ControllerService implements OnDestroy {
  //@ViewChild('formElem') formElem!: ElementRef<HTMLFormElement>;

  webODM_URL: string;
  tokenResponse: WebODMTokenResponse;
  subject: Subject<any>;
  projectId: number;
  collectionData: ImageCollection[] = [];
  pollingInterval: Subscription;
  errorState: boolean = false;

  constructor(private repo: APIService, private http: HttpClient, private snackbar: MatSnackBar) {
    this.webODM_URL = 'http://localhost:8000/';
    this.tokenResponse = {
      token: ""
    }
    this.subject = new Subject<any>();
    this.pollingInterval = new Subscription();
    this.projectId = -1;

    this.authenticateWithWebOdm().subscribe({
      next: (project: WebODMProject) => {
        console.log(project);
        this.projectId = project.id;

        //poll WebODM
        this.pollingInterval = interval(10000)
        .pipe(
          startWith(0),
          switchMap(() => this.getAllWebODMTasks())
        ).subscribe({
          next: async (resp: Observable<WebODMTask[]>) => {
            resp.subscribe({
              next: async (tasks: WebODMTask[]) => {
                let updatedCollection: UpdateImageCollectionInput;
                console.log("[CONTROLLER SERVICE] Polling WebODM...", tasks);
                for(const task of tasks){
                  if(task.status == 10 || task.status == 20){
                    //QUEUED or RUNNING
                    updatedCollection = {
                      collectionID: await this.repo.GetImageCollectionByTaskId(task.id).then((col: GetImageCollectionByTaskIdQuery) => { return col.items[0]!.collectionID; }),
                      completed: false,
                      error: false,
                      pending: true
                    }
                  }
                  else if (task.status == 40) {
                    //COMPLETED
                    this.repo.GetImageCollectionByTaskId(task.id).then((resp: GetImageCollectionByTaskIdQuery) => {
                      //if the 'complete' boolean wasn't true already, then create Map in DynamoDB
                      if(!resp.items[0]!.completed) {
                        //map doesn't exist yet, create new Map
                        const newMap: CreateMapInput = {
                          mapID: resp.items[0]!.taskID!,   //:NB this hack
                          bucket_name: '',  //TODO:
                          file_name: '',    //TODO:
                          collectionID: resp.items[0]!.collectionID!
                        }
                        this.repo.CreateMap(newMap).then((_res: CreateMapMutation) => {
                          console.log("[CONTROLLER SERVICE] Created new map...", _res);
                        }).catch(e => console.log(e));
                      }
                    }).catch(err => {
                      console.log(err);
                    });

                    updatedCollection = {
                      collectionID: await this.repo.GetImageCollectionByTaskId(task.id).then((col: GetImageCollectionByTaskIdQuery) => { return col.items[0]!.collectionID; }),
                      completed: true,
                      error: false,
                      pending: false
                    }
                  }
                  else {
                    //status is 30 (FAILED) or 50 (CANCELED)
                    updatedCollection = {
                      collectionID: await this.repo.GetImageCollectionByTaskId(task.id).then((col: GetImageCollectionByTaskIdQuery) => { return col.items[0]!.collectionID; }),
                      completed: false,
                      error: true,
                      pending: false
                    }
                    //create message here if not already in table
                  }

                  this.repo.UpdateImageCollection(updatedCollection).then((_resp: any) => {
                    console.log("[CONTROLLER SERVICE] Updated collection...", _resp);
                  });
                }
              },
              error: (err: any) => {
                console.log(err);
              }
            });

          },
          error: (err: any) => {
            console.log(err);
            //cannot connect to WebODM
            if(!this.errorState){
              this.errorState = true;
              this.snackbar.open('Cannot connect to WebODM. Make sure your WebODM backend is running.', 'OK', { verticalPosition: 'top' });
            }
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.pollingInterval.unsubscribe();
  }

  //calls 'protected-signup' lambda function and tries to register user (if an invite exists)
  tryRegister(u: User): Observable<any> {
    console.log('[CLIENT] Trying to register user...');
    const body = {
      username: u.user_email,
      password: u.user_password,
      name: u.user_name
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('https://tjgr6foxa1.execute-api.us-east-1.amazonaws.com/development', JSON.stringify(body), { headers: headers });
  }

  async finishRegistration(u: User): Promise<number> {
    //success
    try {
      await Auth.signIn(u.user_email!, u.user_password!);
      return 1;
    } catch (error) {
      console.log('[CLIENT] error signing in:', error);
      return -1;
    }
  }

  async S3upload(fileKey:string, collection:string, folder:string, fileData: File, dataType:string){
    const result = await Storage.put(collection+"/"+folder+"/"+fileKey, fileData, {
      contentType: dataType,
    });
    console.log(21, result);
  };

  async S3download(fileKey:string, collection:string, folder:string, fetch_data:boolean){
    // Storage.list('public/') // for listing ALL files without prefix, pass '' instead
    // .then(result => console.log(result))
    console.log("sent: "+collection+"/"+folder+"/"+fileKey);
    const result = await Storage.get(collection+"/"+folder+"/"+fileKey, { download: fetch_data });
    console.log(result);
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

  //WebODM functions below

  //authenticates and then returns the projects
  authenticateWithWebOdm(): Observable<any> {
    const body = {
      username: "thedylpickles1@gmail.com",
      password: "somethingeasy#1"
    }
    //get auth token
    this.http.post(this.webODM_URL + 'api/token-auth/', body).subscribe({
      next: (jwt) => {
        this.tokenResponse = JSON.parse(JSON.stringify(jwt));

        const headers = new HttpHeaders({
          'Authorization': `JWT ${this.tokenResponse.token}`,
        });
        //use auth token to get projects
        this.http.get(this.webODM_URL + 'api/projects/', { headers: headers }).subscribe({
          next: (projects: any) => {
            this.projectId = projects[0].id;
            this.subject.next(projects[0]);
          },
          error: (err) => {
            this.subject.next(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    return this.subject.asObservable();
  }

  async createODMTask(imgs: any): Promise<any> {

    //};

    // var formData = new FormData();
    // let count = 0;
    // for(const img of imgs){
    //formData.append("Images", imgs);
    // for(const img of imgs){
    //   const i = new File([img], count +'.jpg', { type : 'image/jpg' });
    //   formData.append("Images", i);
    //   count++
    // }
    //console.table(Object.fromEntries(formData));



    // const body = {
    //   data: formData
    // }
    // const headers = new HttpHeaders({
    //   'Authorization': `JWT ${this.tokenResponse.token}`,
    //   'Content-Type': 'multipart/form-data'
    // });
    //return this.http.post(this.webODM_URL + `api/projects/${this.projectId}/tasks/`, body, { headers: headers });
  }

  async getAllWebODMTasks(): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${this.tokenResponse.token}`,
    });
    return this.http.get(this.webODM_URL + `api/projects/${this.projectId}/tasks/`, { headers: headers });
  }

  async getMapAssets(taskID: number): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${this.tokenResponse.token}`,
    });
    return this.http.get(this.webODM_URL + `/api/projects/${this.projectId}/tasks/${taskID}/download/all.zip`, { headers: headers });
  }

  //N.B. this is console output from WebODM (don't use)
  async pollWebODMTask(taskID: string): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${this.tokenResponse.token}`,
    });
    return this.http.get(this.webODM_URL + `api/projects/${this.projectId}/tasks/${taskID}/output/`, { headers: headers });
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
