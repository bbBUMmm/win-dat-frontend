import {Component} from '@angular/core';
import {NgIconsModule, provideIcons} from '@ng-icons/core'; // ✅ IMPORT THIS
import {lucideBox, lucideTriangleAlert} from '@ng-icons/lucide';

// ALERT DIALOG
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
// ALERT DIALOG


// SOONER
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
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
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogTitleDirective,
    HlmButtonDirective,
    HlmToasterComponent
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
