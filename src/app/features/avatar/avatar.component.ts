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
import {UserService} from '../../core/services/user.service';
import {ToastService} from '../../core/services/toast.service';
import {NgIf} from '@angular/common';
import {BrnSheetContentDirective, BrnSheetTriggerDirective} from '@spartan-ng/brain/sheet';

import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import {HlmButtonDirective} from '@spartan-ng/ui-button-helm';
import {UserCreateComponent} from '../users/user-create/user-create.component';
import {Router} from '@angular/router';



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

    HlmIconDirective, NgIf,

    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    HlmButtonDirective,
    UserCreateComponent,
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
  private router = inject(Router); // Inject Router here


  user = this.userService.getUserSignal();
  isLoggedIn = this.userService.isLoggedIn;


  loginUser() {
    this.userService.login()
    this.toasterService.showToast("Login Attempt", "Attempting to log in...");
  }


  logoutUser() {
    this.userService.logout();
    this.toasterService.showToast("Logged Out", "You have been successfully logged out.");
  }

  // @ViewChild(BrnSheetComponent) sheet?: BrnSheetComponent;
  //
  // closeSheet() {
  //   console.log('User created. Closing the sheet.');
  //   if (this.sheet) {
  //     this.sheet.close();
  //   }
  // }
  navigateToNotImplemented() {
    this.router.navigate(['/notImplementedYet']);
  }
}
