import { Component } from '@angular/core';

@Component({
  selector: 'app-lobby-button',
  imports: [],
  templateUrl: './lobby-button.component.html',
  standalone: true,
})
export class LobbyButtonComponent {

  displayLobbies() {
    console.log("Displaying Lobbies");
  }
}
