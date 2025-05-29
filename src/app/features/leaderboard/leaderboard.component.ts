import {Component, inject, OnInit, signal} from '@angular/core';

import {HeaderComponent} from '../header/header.component';
import {UserService} from '../../core/services/user.service';
import {UserModel} from '../../core/models/user-model';
import {CommonModule} from '@angular/common';
import {HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent} from '@spartan-ng/ui-table-helm';
import {toast} from 'ngx-sonner';
import {HlmToasterComponent} from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-leaderboard',
  imports: [HeaderComponent,
    CommonModule,
    HeaderComponent,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmToasterComponent,
  ],
  standalone: true,
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  private userService = inject(UserService);
  leaderboard = signal<UserModel[]>([]);

  // Призи за місця
  private prizes: { [key: number]: number } = {
    1: 50000,
    2: 30000,
    3: 20000,
    4: 10000,
    5: 7500,
    6: 5000,
    7: 2500,
    8: 1000,
    9: 500,
    10: 250,
  };

  ngOnInit(): void {
    this.userService.getLeaderBoard().subscribe({
      next: (users: UserModel[]) => {
        // Сортуємо користувачів за кількістю виграних ігор у спадному порядку
        const sortedUsers = users.sort((a, b) => b.gamesWon - a.gamesWon);
        this.leaderboard.set(sortedUsers);
      },
      error: (err) => {
        console.error('Failed to load leaderboard', err);
        toast.error('Failed to load leaderboard data.', {
          description: 'Please try again later.'
        });
      }
    });
  }

  // Метод для отримання місячної винагороди за місце
  getMonthlyReward(place: number): number {
    return this.prizes[place] || 0; // Повертаємо 0, якщо місце не входить до топ-10
  }
}
