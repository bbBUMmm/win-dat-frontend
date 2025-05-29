import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LeaderboardComponent} from './features/leaderboard/leaderboard.component';
import {NotImplementedYetComponent} from './features/not-implemented-yet/not-implemented-yet.component';
import {LobbyDetailComponent} from './features/lobby-detail/lobby-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'notImplementedYet', component: NotImplementedYetComponent },
  { path: 'lobby/:id', component: LobbyDetailComponent}
];
