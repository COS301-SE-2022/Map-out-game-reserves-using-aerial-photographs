import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService, User } from '../../API.service';
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
    return this.repo.PendingInvitesByEmail(u.user_email!).then((resp) => {
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
        const newUser: User = {
          userID: uuidv4(),
          user_name: u.user_name,
          user_email: u.user_email,
          user_password: hash,
          user_password_salt: salt,
          user_approved: true,
          user_role: "user"
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

}
