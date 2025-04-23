// lobby-state.service.ts
import { Injectable, signal } from '@angular/core';
import {LobbyModel} from '../models/lobby-model';

@Injectable({
  providedIn: 'root',
})
export class LobbyStateService {
  lobbies = signal<LobbyModel[]>([]);
  setLobbies(data: LobbyModel[]) {
    this.lobbies.set(data);
  }
}
