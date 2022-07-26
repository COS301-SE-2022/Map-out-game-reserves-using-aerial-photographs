import { Injectable } from '@angular/core';
import { Auth, Storage } from 'aws-amplify';
import { APIService, CreateUserInput, DeletePendingInvitesInput, User } from '../../API.service';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  constructor(private repo: APIService, private http: HttpClient) {}

  async tryRegister(u: User): Promise<number> {
    console.log('getting pending invite by email...');
    return this.repo.GetPendingInvitesByEmail(u.user_email!).then((resp: any) => {
      let invite: any;
      if(resp != null && resp.items.length > 0) {
        for(let item of resp.items) {
          if(!item._deleted) {
            invite = item;
            break;
          }
        }
      }
      else {
        return -1;
      }

      if(invite != null) {
        if(invite.role == 'admin') {
          u.user_role = 'admin';
        }
        else {
          u.user_role = 'user';
        }
        const toDelete: DeletePendingInvitesInput = {
          inviteID: invite.inviteID,
          _version: 1
        }
        return this.repo.DeletePendingInvites(toDelete).then((res: any) => {
          console.log("deleting pending invite...");
          console.log(res);
          return this.registerUser(u);
        }).catch(() => { return -1; });
      }
      return -1;
    }).catch(() => { return -1; });
  }

  async registerUser(u: User): Promise<number> {
    const newUser: CreateUserInput = {
      userID: uuidv4(),
      user_name: u.user_name,
      user_email: u.user_email,
      user_approved: true,
      user_role: u.user_role
    }

    try {
      const { user } = await Auth.signUp({
        username: u.user_email!,
        password: u.user_password!
      });
    } catch (error) {
      console.log('error signing up:', error);
      return -1;
    }

    return this.repo
      .CreateUser(newUser)
      .then(() => {
        alert('Successfully registered!');
        return 1;
      })
      .catch((e) => {
        console.log('error creating user...', e);
        return -1;
      });
  }

  async S3upload(fileKey:string, collection:string, folder:string, fileData: File){
    const result = await Storage.put(collection+"/"+folder+"/"+fileKey, fileData, {
      contentType: fileData.type,
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
