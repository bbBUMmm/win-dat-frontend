
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../core/services/user.service';
import { UserModel } from '../../core/models/user-model';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';

import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,

    HlmToasterComponent

  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  private userService: UserService = inject(UserService);
  userProfile = signal<UserModel | undefined>(undefined);
  isLoading = signal(true);
  hasError = signal(false);
  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.userService.getAuthenticatedUser().subscribe({
      next: (user: UserModel) => {
        this.userProfile.set(user);
        this.isLoading.set(false);
        console.log('User profile loaded:', user);
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
        this.isLoading.set(false);
        this.hasError.set(true);
        toast.error('Failed to load your profile.', {
          description: 'Please try refreshing the page or logging in again.'
        });
      }
    });
  }
}
