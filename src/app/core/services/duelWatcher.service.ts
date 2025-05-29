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
  // private currentLobbyId: number | null = null; // Ця змінна більше не потрібна

  constructor(private http: HttpClient) {
  }

  // Метод setLobbyId більше не потрібен

  startPolling(lobbyId: number) { // Змінено: lobbyId приймається як параметр
    if (this.pollingSubscription) return;
    if (lobbyId === null) { // Перевірка на наявність lobbyId
      console.error('Lobby ID is not set for DuelWatcherService.');
      return;
    }

    this.pollingSubscription = interval(3000).subscribe(() => {
      // Змінено: Використовуємо lobbyId, переданий як параметр
      this.lobbyService.getWinnerOfLobby(lobbyId) // Використовуємо getWinnerOfCs2Duel
        .subscribe((response) => {
          if (response.winnerUsername) { // Змінено: Використовуємо winnerUsername
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
    // this.currentLobbyId = null; // Цей рядок більше не потрібен
  }
}
