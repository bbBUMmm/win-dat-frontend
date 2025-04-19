import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
@Component({
  selector: 'app-lobby',
  imports: [HlmBadgeDirective],
  templateUrl: './lobby.component.html',
  standalone: true,
})
export class LobbyComponent {

}
