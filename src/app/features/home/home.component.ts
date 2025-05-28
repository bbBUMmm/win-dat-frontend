import {Component} from '@angular/core';
import {NgIconsModule, provideIcons} from '@ng-icons/core';
import {lucideBox, lucideTriangleAlert} from '@ng-icons/lucide';

// SOONER
import { toast } from 'ngx-sonner';
// SOONER
import {LobbyComponent} from '../lobby/lobby.component';
import {LobbyButtonComponent} from '../lobby-button/lobby-button.component';
import {HeaderComponent} from '../header/header.component';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    LobbyComponent,
    LobbyButtonComponent,
    HeaderComponent,
    NgIconsModule,
    HlmToasterComponent
  ],
  providers: [
    provideIcons({lucideBox, lucideTriangleAlert}),
  ],
})
export class HomeComponent {
  showToast() {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2024 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      }
    })
  }
}
