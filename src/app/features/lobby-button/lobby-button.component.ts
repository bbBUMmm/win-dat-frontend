import {Component, inject} from '@angular/core';
import {LobbyApiService} from '../../core/services/lobby-api.service';
import {BehaviorSubject, catchError, finalize, Observable, of, switchMap} from 'rxjs';
import {LobbyModel} from '../../core/models/lobby-model';
import {AsyncPipe, NgIf} from '@angular/common';

import {provideIcons} from '@ng-icons/core';
import {lucideTriangleAlert} from '@ng-icons/lucide';

import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {LobbyStateService} from '../../core/services/lobbyState.service';

import {UserService} from '../../core/services/user.service';
import {toast} from 'ngx-sonner';
import {HttpErrorResponse} from '@angular/common/http';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-lobby-button',
  imports: [
    HlmButtonDirective,
    AsyncPipe,
    NgIf,
    HlmToasterComponent
  ],
  providers: [provideIcons({lucideTriangleAlert})],
  templateUrl: './lobby-button.component.html',
  standalone: true,
})
export class LobbyButtonComponent {
  private lobbiesApiService = inject(LobbyApiService);
  private lobbyState = inject(LobbyStateService);
  private userService = inject(UserService);

  private refreshLobbies$ = new BehaviorSubject<void | null>(null);

  lobbies$: Observable<LobbyModel[]> = this.refreshLobbies$.pipe(
    switchMap(trigger => {
      // Не запускати, якщо не було викликано вручну
      if (trigger === null) {
        return of([]);
      }

      this.loading$.next(true);
      this.error$.next(null);

      return this.userService.getAuthenticatedUser().pipe(
        switchMap(() =>
          this.lobbiesApiService.getLobbies().pipe(
            finalize(() => this.loading$.next(false)),
            catchError((error) => {
              this.error$.next('Failed to load lobbies.');
              console.error('Error loading lobbies', error);
              return of([]);
            })
          )
        ),
        catchError((error: HttpErrorResponse) => {
          this.loading$.next(false);
          this.error$.next('You need to be logged in to be able to see lobbies');
          toast.error('Authentication Required', {
            description: 'You need to be logged in to view lobbies.',
          });
          return of([]);
        })
      );
    })
  );

  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  // Видалено автоматичну підписку

  loadLobbies() {
    this.refreshLobbies$.next(undefined);
    this.lobbies$.subscribe((lobbies) => {
      this.lobbyState.setLobbies(lobbies);
    });
  }
}
