import { Component } from '@angular/core';
import {LobbyComponent} from '../lobby/lobby.component';
import {LobbyButtonComponent} from '../../shared/components/lobby-button/lobby-button.component';

@Component({
  selector: 'app-home',
  imports: [LobbyComponent, LobbyButtonComponent],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent {

}
