import {inject, Injectable, signal} from '@angular/core';
import {UserModel} from '../models/user-model';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from '../config/authCodeFlowConfig.config';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserCreateRequest} from '../models/user-create-request';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<UserModel | undefined>(undefined);

  public isLoggedIn = signal<boolean>(false);

  private http = inject(HttpClient);

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

        // True if userModel is present
        this.isLoggedIn.set(!!userModel);
        return userModel;
      })
      .catch(() => {

        this.isLoggedIn.set(false);
        return undefined;
      });
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        const userModel = this.oauthService.getIdentityClaims() as UserModel;
        this.user.set(userModel);

        this.isLoggedIn.set(!!userModel);
      })
      .catch(() => {

        this.isLoggedIn.set(false);
      });
  }

  logout() {
    this.oauthService.logOut();
    this.user.set(undefined);

    this.isLoggedIn.set(false);
  }

  isUserLoggedIn() {
    return this.tryLogin()
      .then((userModel : UserModel | undefined) => {
        return !!userModel;
      })
  }

  createUser(userData: UserCreateRequest): Observable<any> {
    return this.http.post(`${environment.beUrl}/users`, userData);
  }

  connectToLobby(lobbyId: number ): Observable<any> {
    return this.http.post(`${environment.beUrl}/lobbies/${lobbyId}/users`, lobbyId);
  }

  getLeaderBoard(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.beUrl}/users/leaderboard`);
  }


  getAuthenticatedUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.beUrl}/users/me`);
  }
}


export const canActiveHome: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.tryLogin().then(userModel => {
    if (userModel) {
      return true;
    } else {
      userService.login();
      return false;
    }
  });
};
