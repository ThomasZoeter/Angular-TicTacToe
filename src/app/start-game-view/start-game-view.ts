import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {PlayerService} from '../services/choose-player.service';

@Component({
  selector: 'start-game-view',
  standalone: true,
  styleUrl: 'start-game-view.css',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  template: `
      <div class="center">
          <h1> Tic-Tac-Toe!</h1>
          <button (click)="gameHasBeenStarted=true">Start new game</button>
          <div> @if (gameHasBeenStarted) {
              <p>Choose which side you want to play:</p>
              <button (click)="changePlayer('X')">X</button>
              |
              <button (click)="changePlayer('O')">O</button>
          }
          </div>
          <div> @if (playerHasBeenChosen) {
              <h1>Side chosen: {{ player }}</h1>
              <button routerLink="/game"> Start Game</button>
          }
          </div>
      </div>
  `
})
export class StartGame {
  constructor(private playerService: PlayerService) {
  }

  player = ''
  gameHasBeenStarted = false
  playerHasBeenChosen = false

  public changePlayer(playerChosen: string) {
    this.player = playerChosen
    this.playerHasBeenChosen = true
    this.playerService.choosePlayer(playerChosen)
  }
}
