import {Component, inject} from '@angular/core';

import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {LobbyStateService} from '../../core/services/lobbyState.service';
import {HlmIconDirective} from '@spartan-ng/ui-icon-helm';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {lucideChevronRight} from '@ng-icons/lucide';
import {provideIcons} from '@ng-icons/core';
import { NgIcon } from '@ng-icons/core';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router'; // **Ось це ключовий імпорт!**


@Component({
  selector: 'app-lobby',
  imports: [HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent, HlmTdComponent,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon
  ],
  providers: [provideIcons({ lucideChevronRight })],
  host: {
    class: 'w-full overflow-x-auto',
  },
  templateUrl: './lobby.component.html',
  standalone: true,
})
export class LobbyComponent {
  private lobbyState = inject(LobbyStateService);
  protected lobbies = this.lobbyState.lobbies;
  private userService = inject(UserService);
  private router = inject(Router); // <--- Додано: Інжектування Router


  public gameAmount: number = 5000;


  connectToLobby(lobbyId: number) {
    console.log('Attempting to connect to lobby with ID:', lobbyId);
    this.userService.connectToLobby(lobbyId).subscribe({
      next: (response) => {
        console.log('Successfully connected to lobby:', response);
        this.router.navigate(['/lobby', lobbyId]);
      },
      error: (error) => {
        console.error('Failed to connect to lobby:', error);
      }
    });
  }
}
