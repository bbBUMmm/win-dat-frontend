import {Component, inject} from '@angular/core';
import {AvatarComponent} from '../avatar/avatar.component';

// Breadcrumb
import {
  HlmBreadcrumbDirective,
  HlmBreadcrumbEllipsisComponent,
  HlmBreadcrumbItemDirective,
  HlmBreadcrumbLinkDirective,
  HlmBreadcrumbListDirective,
  HlmBreadcrumbPageDirective,
  HlmBreadcrumbSeparatorComponent,
} from '@spartan-ng/ui-breadcrumb-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuComponent, HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';
import {Router} from '@angular/router';
// Breadcrumb

@Component({
    selector: 'app-header',
    imports: [
      AvatarComponent,

      HlmBreadcrumbDirective,
      HlmBreadcrumbSeparatorComponent,
      HlmBreadcrumbEllipsisComponent,
      HlmBreadcrumbListDirective,
      HlmBreadcrumbItemDirective,
      HlmBreadcrumbPageDirective,
      HlmBreadcrumbLinkDirective,

      BrnMenuTriggerDirective,
      HlmMenuComponent,
      HlmMenuItemDirective,],
    standalone: true,
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  private router: Router = inject(Router);
  notImplementedYet() {
    this.router.navigate(['/notImplementedYet'])
  }
}
