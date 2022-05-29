import { ClientApiService } from "@aerial-mapping/client/shared/services";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private apiService: ClientApiService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let isAuthenticated = false;
        this.apiService.getAuthStatus().subscribe((resp) => {
          isAuthenticated = resp
        });
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
        return isAuthenticated;
    }
}
