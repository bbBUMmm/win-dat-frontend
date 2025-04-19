import {Component} from '@angular/core';
import {HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective} from '@spartan-ng/ui-avatar-helm';
import {provideIcons} from '@ng-icons/core';
import {
  lucideCircleUser,
  lucideLayers,
  lucideMessageSquare,
  lucideCode,
  lucideMail,
  lucideLogOut,
  lucideSmile,
  lucideCog,
  lucideGithub,
  lucideKeyboard,
  lucideUser,
  lucidePlus,
  lucideCirclePlus,
  lucideCircleHelp,
} from '@ng-icons/lucide';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {HlmIconDirective} from '@spartan-ng/ui-icon-helm';
import {BrnMenuTriggerDirective} from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-avatar',
  imports: [HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    BrnMenuTriggerDirective,

    HlmMenuComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuGroupComponent,

    HlmButtonDirective,
    HlmIconDirective,],
  providers: [
    provideIcons({
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideKeyboard,
      lucideCircleUser,
      lucideSmile,
      lucidePlus,
      lucideGithub,
      lucideCircleHelp,
      lucideCode,
      lucideLogOut,
      lucideMail,
      lucideMessageSquare,
      lucideCirclePlus,
    }),
  ],
  standalone: true,
  templateUrl: './avatar.component.html'
})
export class AvatarComponent {

}
