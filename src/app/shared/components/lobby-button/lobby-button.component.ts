import {Component, inject} from '@angular/core';
import {LobbyApiService} from '../../../features/lobby/services/lobby-api.service';
import {BehaviorSubject, catchError, finalize, Observable, of} from 'rxjs';
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

  private userService = inject(UserService);
  private lobbiesApiService = inject(LobbyApiService);

  lobbies$: Observable<LobbyModel[]> | undefined;
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  loadLobbies() {
    this.loading$.next(true);
    this.error$.next(null);
    this.lobbies$ = this.lobbiesApiService.getLobbies().pipe(
      finalize(() => this.loading$.next(false)),
      catchError((error) => {
        this.error$.next('Failed to load lobbies.');
        console.error('Error loading lobbies', error);
        return of([]); // Return an empty observable to avoid breaking the stream
      })
    );
  }

  loginUser(){
    this.userService.login()
  }
}
