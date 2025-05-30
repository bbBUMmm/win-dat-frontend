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
import {Router} from '@angular/router';
import {toast} from 'ngx-sonner';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';
import { HttpErrorResponse } from '@angular/common/http';
import {UserModel} from '../../core/models/user-model';



@Component({
  selector: 'app-lobby',
  imports: [HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent, HlmTdComponent,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
    HlmToasterComponent,
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
  private router = inject(Router);


  public gameAmount: number = 5000;

  redirectOrConnect(lobbyId: number) {
    this.userService.getAuthenticatedUser().subscribe({
      next: (user: UserModel) => {
        if (user.lobbyId === lobbyId) {
          this.router.navigate(['/lobby', lobbyId]);
        } else {
          this.connectToLobby(lobbyId);
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409 && error.error) {
          const user = error.error as UserModel;

          // Check if user is already in the target lobby
          if (user.lobbyId === lobbyId) {
            this.router.navigate(['/lobby', lobbyId]);
          } else {
            this.connectToLobby(lobbyId);
          }
        } else {
          toast.error('Failed to retrieve user', {
            description: error.error?.message || 'An unknown error occurred.',
          });
        }
      }
    });
  }



  connectToLobby(lobbyId: number) {
    console.log('Attempting to connect to lobby with ID:', lobbyId);
    this.userService.connectToLobby(lobbyId).subscribe({
      next: (response) => {
        console.log('Successfully connected to lobby:', response);
        this.router.navigate(['/lobby', lobbyId]);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to connect to lobby:', error);


        const errorMessageFromBackend = error.error?.message || 'An unknown error occurred.';

        switch (error.status) {
          case 400:
            if (errorMessageFromBackend.includes("User is not in any lobby")) {
              toast.error('Invalid Action', {
                description: errorMessageFromBackend
              });
            } else {
              toast.error('Bad Request', {
                description: errorMessageFromBackend
              });
            }
            break;
          case 401:
            toast.error('Authentication Required', {
              description: 'Please log in to connect to a lobby.',
            });
            break;
          case 404:
            toast.error('Not Found', {
              description: errorMessageFromBackend,
            });
            break;
          case 409:
            toast.error('Action Conflict', {
              description: errorMessageFromBackend,
            });
            break;
          case 412:
            toast.error('Condition Not Met', {
              description: errorMessageFromBackend,
            });
            break;
          case 403:
            toast.error('Access Forbidden', {
              description: errorMessageFromBackend,
            });
            break;
          default:
            toast.error('Connection Failed', {
              description: 'An unexpected error occurred. Please try again.',
            });
            break;
        }
      }
    });
  }
}
