import { Component } from '@angular/core';
import { NgIconsModule, provideIcons } from '@ng-icons/core'; // ✅ IMPORT THIS
import { lucideBox, lucideTriangleAlert } from '@ng-icons/lucide';

import {
  HlmAlertDirective,
  HlmAlertDescriptionDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

import { LobbyComponent } from '../lobby/lobby.component';
import { LobbyButtonComponent } from '../../shared/components/lobby-button/lobby-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    LobbyComponent,
    LobbyButtonComponent,
    NgIconsModule, // ✅ <-- REQUIRED
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmIconDirective,
  ],
  providers: [
    provideIcons({ lucideBox, lucideTriangleAlert }), // ✅ PROVIDE ICONS
  ],
})
export class HomeComponent {}
