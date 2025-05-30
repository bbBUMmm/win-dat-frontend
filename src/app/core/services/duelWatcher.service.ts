import {BehaviorSubject, interval, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {LobbyApiService} from './lobby-api.service';


@Injectable({
  providedIn: 'root',
})
export class DuelWatcherService {
  private duelResultSubject = new BehaviorSubject<string | null>(null);
  private lobbyService = inject(LobbyApiService);
  duelResult$ = this.duelResultSubject.asObservable();

  private pollingSubscription?: Subscription;

  constructor(private http: HttpClient) {
  }


  startPolling(lobbyId: number) {
    if (this.pollingSubscription) return;
    if (lobbyId === null) {
      console.error('Lobby ID is not set for DuelWatcherService.');
      return;
    }

    this.pollingSubscription = interval(3000).subscribe(() => {
      this.lobbyService.getWinnerOfLobby(lobbyId)
        .subscribe((response) => {
          if (response.winnerUsername) {
            this.duelResultSubject.next(response.winnerUsername);
            this.stopPolling();
          }
        });
    });
  }

  stopPolling() {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = undefined;
  }

  clear() {
    this.duelResultSubject.next(null);
  }
}
