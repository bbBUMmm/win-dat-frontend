import {Component, inject} from '@angular/core';
import {NgIconsModule, provideIcons} from '@ng-icons/core';
import {lucideBox, lucideTriangleAlert} from '@ng-icons/lucide';

// SOONER
import {toast} from 'ngx-sonner';
// SOONER
import {LobbyComponent} from '../lobby/lobby.component';
import {LobbyButtonComponent} from '../lobby-button/lobby-button.component';
import {HeaderComponent} from '../header/header.component';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {LobbyApiService} from '../../core/services/lobby-api.service';
import {BrnDialogContentDirective, BrnDialogTriggerDirective} from '@spartan-ng/brain/dialog';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';
import {HlmInputDirective} from '@spartan-ng/ui-input-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent, HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent, HlmDialogTitleDirective
} from '@spartan-ng/ui-dialog-helm';
import {FormsModule} from '@angular/forms';
import {DuelWatcherService} from '../../core/services/duelWatcher.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    LobbyComponent,
    LobbyButtonComponent,
    HeaderComponent,
    NgIconsModule,
    HlmToasterComponent,
    HlmButtonDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    FormsModule,
  ],
  providers: [
    provideIcons({lucideBox, lucideTriangleAlert}),
  ],
})
export class HomeComponent {

  public lobbyName: string;
  public amount: number;

  constructor(private duelWatcher: DuelWatcherService) {
    this.lobbyName = '';
    this.amount = 0
  }

  private userService = inject(UserService); // <--- Інжектуйте UserService
  private router = inject(Router);


  lobbyService = inject(LobbyApiService);

  showToast() {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2024 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      }
    })
  }

  checkLoggedIn(){
    this.userService.getAuthenticatedUser().subscribe({
      error: (error: HttpErrorResponse) => {
        // If user is not authenticated
        toast.error('Authentication Required', {
          description: 'You need to be logged in to create a lobby.',
        });
      }
    });
  }

  createLobbyAndCloseDialog(dialogContext: any) {
    // Get the authenticated user first
    this.userService.getAuthenticatedUser().subscribe({
      next: () => {
        // Validate input
        if (!this.lobbyName || this.amount <= 0) {
          toast.error('Validation Error', {
            description: 'Please enter a valid lobby name and a positive amount.',
          });
          return;
        }

        // Create the lobby
        this.lobbyService.createLobby(this.lobbyName, this.amount).subscribe({
          next: (response) => {
            toast.success('Lobby Created!', {
              description: `Lobby "${response.name}" with bet ${response.amount} created successfully. Load Lobbies to see changes.`,
            });
            dialogContext.close();
          },
          error: (error) => {
            console.error('Error creating lobby:', error);
            toast.error('Failed to Create Lobby', {
              description: 'An error occurred while creating the lobby.',
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        // If user is not authenticated
        toast.error('Authentication Required', {
          description: 'You need to be logged in to create a lobby.',
        });
      }
    });
  }
}
