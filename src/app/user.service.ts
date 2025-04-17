import {inject, Injectable, signal} from '@angular/core';
import {UserModel} from './core/models/user-model';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './core/config/authCodeFlowConfig.config';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<UserModel | undefined>(undefined);

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.tryLogin();
  }


  getUserSignal() {
    return this.user.asReadonly();
  }

  tryLogin() {
    return this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        let userModel = this.oauthService.getIdentityClaims() as UserModel;
        this.user.set(userModel);

        return userModel;
      })
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        this.user.set(this.oauthService.getIdentityClaims() as UserModel);
      })
  }

  logout() {
    this.oauthService.logOut();
    this.user.set(undefined);
  }

  isUserLoggedIn() {
    return this.tryLogin()
      .then((userModel : UserModel | undefined) => {
        return !!userModel;
      })
  }

}


export const canActiveHome: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);


  return userService.isUserLoggedIn()
    .then(value => {
      if (value) {
        return true;
      } else {
        // return router.createUrlTree(['/counter']);
        userService.login();
        return false;
      }
    })
};
