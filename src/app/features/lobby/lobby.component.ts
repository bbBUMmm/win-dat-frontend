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
        // If the user is already in the requested lobby, redirect directly
        if (user.lobbyId === lobbyId) {
          this.router.navigate(['/lobby', lobbyId]);
        } else {
          // Otherwise, attempt to connect to the lobby
          this.connectToLobby(lobbyId);
        }
      },
      error: (error: HttpErrorResponse) => {
        // If backend returns 409 Conflict but still includes user data in the response body
        if (error.status === 409 && error.error) {
          const user = error.error as UserModel;

          // Check if user is already in the target lobby
          if (user.lobbyId === lobbyId) {
            this.router.navigate(['/lobby', lobbyId]);
          } else {
            this.connectToLobby(lobbyId);
          }
        } else {
          // Handle all other errors normally
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

        // Access the custom message from the backend's error body
        // The structure from your GlobalExceptionHandler is:
        // { timestamp: "...", status: ..., error: "...", message: "..." }
        const errorMessageFromBackend = error.error?.message || 'An unknown error occurred.';

        switch (error.status) {
          case 400:
            // Based on your backend code for LobbyFullException and UserIsNotInAnyLobbyException
            // LobbyFullException (was 400, now 409) and UserIsNotInAnyLobbyException (is 400)
            // You might want to differentiate these if multiple 400s exist.
            // For now, if 400 maps to UserIsNotInAnyLobbyException:
            if (errorMessageFromBackend.includes("User is not in any lobby")) {
              toast.error('Invalid Action', {
                description: errorMessageFromBackend // Use the specific message from backend
              });
            } else { // Generic 400 or if LobbyFull still returns 400
              toast.error('Bad Request', {
                description: errorMessageFromBackend // Use the specific message from backend
              });
            }
            break;
          case 401:
            toast.error('Authentication Required', {
              description: 'Please log in to connect to a lobby.',
            });
            // Optional: Redirect to login page if user is not authenticated
            // this.router.navigate(['/login']);
            break;
          case 404: // Lobby not found or User not found
            toast.error('Not Found', {
              description: errorMessageFromBackend, // Use the specific message from backend
            });
            break;
          case 409: // Conflict - User is already in the lobby OR Lobby is full
            // Based on your backend, 409 can now be for LobbyFullException, UserAlreadyInLobbyException,
            // and UserAlreadyHasLobbyWithNameException.
            // You can use the specific message from the backend, which already contains the detail.
            toast.error('Action Conflict', {
              description: errorMessageFromBackend, // This will contain "Lobby is already full."
              // or "User is already in the lobby with name X."
              // or "User X is already in lobby."
            });
            break;
          case 412: // Precondition Failed (if you decided to use it) or other conditions
            // Assuming this is for UserDoesNotHaveEnoughBalanceException
            toast.error('Condition Not Met', {
              description: errorMessageFromBackend, // e.g., "User does not have enough credits."
            });
            break;
          case 403: // Forbidden (if you decided to use this for balance or other access issues)
            // If UserDoesNotHaveEnoughBalanceException returns 403
            toast.error('Access Forbidden', {
              description: errorMessageFromBackend, // e.g., "User does not have enough balance..."
            });
            break;
          default: // Generic error message for any other status code (e.g., 500 Internal Server Error)
            toast.error('Connection Failed', {
              description: 'An unexpected error occurred. Please try again.',
            });
            break;
        }
      }
    });
  }
}
