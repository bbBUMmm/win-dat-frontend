import {Component, inject} from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {NgIcon, provideIcons} from '@ng-icons/core';
import { lucideTriangleAlert } from '@ng-icons/lucide';
import {Router} from '@angular/router';
@Component({
  selector: 'app-not-implemented-yet',
  imports: [HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmButtonDirective,
    HlmIconDirective, NgIcon,],
  providers: [provideIcons({ lucideTriangleAlert })],
  standalone: true,
  templateUrl: './not-implemented-yet.component.html'
})
export class NotImplementedYetComponent {
  private router: Router = inject(Router);
  goHome() {
    this.router.navigate(['/home']);
  }
}
