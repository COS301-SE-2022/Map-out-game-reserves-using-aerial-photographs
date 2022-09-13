import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AWSAmplifyWrapper } from './aws-amplify-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Injecting in aws Auth library for testing purposes
  constructor(private router: Router, public authWrapper: AWSAmplifyWrapper) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.authWrapper.getAuth().currentAuthenticatedUser().then(() => { return true; })
      .catch(() => {
        this.router.navigate(['login']);
        return false;
      });
  }
}
