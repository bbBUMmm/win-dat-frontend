import {Component, inject} from '@angular/core';
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
import {UserService} from '../../../user.service';
import {ToastService} from '../../../core/services/toast.service';

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

    HlmIconDirective,
  ],
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
  private userService = inject(UserService);
  private toasterService = inject(ToastService);

  user = this.userService.getUserSignal();

  loginUser() {
    this.userService.login()
    this.toasterService.showToast("login succsefsld", "sdfsdf ahaha")
  }


  logoutUser() {
    if (this.user()){
      this.userService.logout()
    }
  }
}
