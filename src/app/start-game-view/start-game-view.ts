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
      <p>Choose which side you want to play:</p>
      <button (click)="changePlayer('X')">X</button> |
      <button (click)="changePlayer('O')">O</button>

      <h1>Side chosen: {{ player }}</h1>
      <div> @if (player !== '') {
          <button routerLink="/game"> Start Game</button>
      }

      </div>
  `
})
export class StartGame {
  constructor(private playerService: PlayerService) {
  }

  player = ''

  public changePlayer(playerChosen: string) {
    this.player = playerChosen
    this.playerService.choosePlayer(playerChosen)
  }
}
