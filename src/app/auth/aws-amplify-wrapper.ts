import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AWSAmplifyWrapper {
  constructor(){}
  getAuth(): any {
    return Auth;
  }
}
