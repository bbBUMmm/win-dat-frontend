import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LobbyModel} from '../../../core/models/lobby-model';

@Injectable({
  providedIn: 'root'
})

export class LobbyApiService {
  private http: HttpClient = inject(HttpClient);

  getLobbies(){
    return this.http.get<LobbyModel[]>('/lobbies')
  }
}
