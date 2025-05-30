import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LobbyModel} from '../models/lobby-model';
import {Observable} from 'rxjs';
import {LobbyCreateRequest} from '../models/lobby-create-request';
import {WinnerResponse} from '../models/winner-response';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class LobbyApiService {
  private http: HttpClient = inject(HttpClient);

  getLobbies(): Observable<LobbyModel[]>{
    return this.http.get<LobbyModel[]>(`${environment.beUrl}/lobbies`)
  }

  getOneLobby(lobbyId: number): Observable<LobbyModel>{
    return this.http.get<LobbyModel>(`${environment.beUrl}/lobbies/` + lobbyId);
  }

  leaveLobby(): Observable<LobbyModel> {
    return this.http.delete<LobbyModel>(`${environment.beUrl}/lobbies/me`);
  }

  createLobby(lobbyName: string, amount: number): Observable<LobbyModel> {
    const body: LobbyCreateRequest = {
      name: lobbyName,
      amount: amount
    };
    return this.http.post<LobbyModel>(`${environment.beUrl}/lobbies`, body);
  }

  getWinnerOfLobby(lobbyId: number): Observable<WinnerResponse> {
    return this.http.get<WinnerResponse>(`${environment.beUrl}/duel-winner/` + lobbyId);
  }

}
