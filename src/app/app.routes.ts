import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LeaderboardComponent} from './features/leaderboard/leaderboard.component';
import {NotImplementedYetComponent} from './shared/components/not-implemented-yet/not-implemented-yet.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'notImplementedYet', component: NotImplementedYetComponent },
];
