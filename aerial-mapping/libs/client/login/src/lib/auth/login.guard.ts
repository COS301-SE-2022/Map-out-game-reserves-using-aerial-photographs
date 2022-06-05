import { ClientApiService } from "@aerial-mapping/client/shared/services";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private apiService: ClientApiService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
      let isAuthenticated = false;
      return this.apiService.getAuthStatus(this.getCookie('jwt')).pipe(
          map(response => {
            isAuthenticated = response.data.getAuthStatus;
            if(!isAuthenticated) {
              this.router.navigate(['login']);
            }
            return isAuthenticated;
          }),
          catchError(() => {
            if(!isAuthenticated) {
              this.router.navigate(['login']);
            }
            return of(false);
          })
      );
    }

    getCookie(cname: string): string {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
}
