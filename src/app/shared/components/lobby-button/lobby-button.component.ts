import {Component, inject} from '@angular/core';
import {LobbyApiService} from '../../../features/lobby/services/lobby-api.service';
import {BehaviorSubject, catchError, finalize, Observable, of, switchMap} from 'rxjs';
import {LobbyModel} from '../../../core/models/lobby-model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../../user.service';

// Alert
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert } from '@ng-icons/lucide';
// Alert

//  Spartan Button
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {NgIcon} from '@ng-icons/core';
import {LobbyStateService} from '../../../core/services/lobbyState.service';
//  Spartan Button
@Component({
  selector: 'app-lobby-button',
  imports: [
    HlmButtonDirective,
    AsyncPipe,
    NgIf,
    NgForOf,
    NgIcon,
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmIconDirective

  ],
  providers: [provideIcons({ lucideTriangleAlert })],
  templateUrl: './lobby-button.component.html',
  standalone: true,
})
export class LobbyButtonComponent {
  private lobbiesApiService = inject(LobbyApiService);
  private lobbyState = inject(LobbyStateService);

  private refreshLobbies$ = new BehaviorSubject<void>(undefined);
  lobbies$: Observable<LobbyModel[]> = this.refreshLobbies$.pipe(
    switchMap(() => {
      this.loading$.next(true);
      this.error$.next(null);
      return this.lobbiesApiService.getLobbies().pipe(
        finalize(() => this.loading$.next(false)),
        catchError((error) => {
          this.error$.next('Failed to load lobbies.');
          console.error('Error loading lobbies', error);
          return of([]);
        })
      );
    })
  );
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.lobbies$.subscribe((lobbies) => {
      this.lobbyState.setLobbies(lobbies);
    });
  }

  loadLobbies() {
    this.refreshLobbies$.next(undefined);
  }
}
