import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {BrnCommandImports} from '@spartan-ng/brain/command';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective, HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from '@spartan-ng/ui-card-helm';
import {HlmCommandImports} from '@spartan-ng/ui-command-helm';
import {lucideCheck, lucideChevronDown} from '@ng-icons/lucide';
import {provideIcons} from '@ng-icons/core';
import {LobbyApiService} from '../../core/services/lobby-api.service';
import {LobbyModel} from '../../core/models/lobby-model';
import {ActivatedRoute, Router} from '@angular/router';
import {DuelWatcherService} from '../../core/services/duelWatcher.service';
import {Subscription} from 'rxjs';
import {toast} from 'ngx-sonner';


@Component({
  selector: 'app-lobby-detail',
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HeaderComponent,
  ],
  providers: [provideIcons({lucideCheck, lucideChevronDown})],
  standalone: true,
  templateUrl: './lobby-detail.component.html'
})
export class LobbyDetailComponent implements OnInit, OnDestroy {
  private duelWatcher = inject(DuelWatcherService);
  private lobbyService: LobbyApiService = inject(LobbyApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  lobby = signal<LobbyModel | undefined>(undefined);
  duelWinner = signal<string | null>(null);
  private duelWatcherSubscription: Subscription | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lobbyId = Number(params.get('id'));
      if (lobbyId) {
        // Й ось сюди треба прокинути лоббі ід
        this.duelWatcher.startPolling(lobbyId); // Змінено: Передаємо lobbyId сюди
        this.subscribeToDuelResults(); // Цей рядок можна залишити тут

        this.lobbyService.getOneLobby(lobbyId).subscribe({
          next: (data) => {
            this.lobby.set(data);
            console.log(this.lobby());
          },
          error: (err) => {
            console.error('Failed to load lobby details', err);
            this.router.navigate(['/home']);
          }
        });
      } else {
        console.warn('Lobby ID not found in URL parameters. Redirecting to home.');
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.duelWatcherSubscription) {
      this.duelWatcherSubscription.unsubscribe();
    }

    this.duelWatcher.stopPolling();
    this.duelWatcher.clear();
  }

  private subscribeToDuelResults() {
    this.duelWatcherSubscription = this.duelWatcher.duelResult$.subscribe(winner => {
      if (winner) {
        this.duelWinner.set(winner);
        toast.success(`Duel Winner: ${winner}!`);
      } else {
        this.duelWinner.set(null);
      }
    });
  }

  public state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  leaveLobby() {
    this.lobbyService.leaveLobby().subscribe({
      next: () => {
        console.log('Successfully left the lobby.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Failed to leave lobby:', err);
      }
    });
  }
}
