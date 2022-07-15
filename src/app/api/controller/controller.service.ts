import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService, CreateFlightDetailsInput, CreateGameParkInput, CreateImageCollectionInput, CreateMessageInput, CreateUserInput, User } from '../../API.service';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcryptjs');

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  saltRounds = 10;

  constructor(private repo: APIService) {
    this.repo.ListPendingInvites().then((event) => {
      console.log(event.items);
    })
  }

  async tryRegister(u: User): Promise<number> {
    return this.repo.PendingInvitesByEmail(u.user_email!).then((resp:any) => {
      if(resp.items.length != 0) {
        console.log(resp.items[0]);
        const toDelete = {
          inviteID: resp.items[0]!.inviteID,
          _version: 1
        }
        this.repo.DeletePendingInvites(toDelete).then((resp) => {
          console.log(resp);
        }).catch(() => { return -1; });
        return this.registerUser(u);
      }
      return -1;
    }).catch(() => { return -1; });
  }

  private async registerUser(u: User): Promise<number> {
    return bcrypt.genSalt(this.saltRounds, (_err: any, salt: string) => {
      bcrypt.hash(u.user_password, salt, async (_error: any, hash: string) => {
        const newUser: CreateUserInput = {
          userID: uuidv4(),
          user_name: u.user_name,
          user_email: u.user_email,
          user_password: hash,
          user_password_salt: salt,
          user_approved: true,
          user_role: "user"
          // __typename, 
          // createdAt, 
          // updatedAt, 
          // _version, 
          // _lastChangedAt
        }

        try {
          const { user } = await Auth.signUp({
            username: u.user_email!,
            password: u.user_password!
          });
          console.log(user);
        } catch (error) {
          console.log('error signing up:', error);
          return -1;
        }

        return this.repo
          .CreateUser(newUser)
          .then((event) => {
            alert('Successfully registered!');
            return 1;
          })
          .catch((e) => {
            console.log('error creating user...', e);
            return -1;
          });
      });
    });
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
