import {Component} from '@angular/core';
import {NgIconsModule, provideIcons} from '@ng-icons/core'; // ✅ IMPORT THIS
import {lucideBox, lucideTriangleAlert} from '@ng-icons/lucide';




// SOONER
import { toast } from 'ngx-sonner';
// SOONER
import {LobbyComponent} from '../lobby/lobby.component';
import {LobbyButtonComponent} from '../../shared/components/lobby-button/lobby-button.component';
import {HeaderComponent} from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    LobbyComponent,
    LobbyButtonComponent,
    HeaderComponent,
    NgIconsModule, // ✅ <-- REQUIRED
  ],
  providers: [
    provideIcons({lucideBox, lucideTriangleAlert}), // ✅ PROVIDE ICONS
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
