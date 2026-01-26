import {Component, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
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
      <div class="center" animate.enter="enter-animation" >
          <h1> Tic-Tac-Toe!</h1>
          <button (click)="toggleGameStart()">Start new game</button>
          @if (newGameHasBeenStarted()) {
          <div animate.enter="enter-animation">
              <p>Choose which side you want to play:</p>
              <button (click)="changePlayer('X')">X</button>
              |
              <button (click)="changePlayer('O')">O</button>

          </div> }
          @if (playerHasBeenChosen()) {
          <div animate.enter="enter-animation">
              <h1>Side chosen: {{ player }}</h1>
              <button routerLink="/game"> Start Game</button>
          </div>
          }
      </div>
  `
})
export class StartGame implements OnInit{
  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
  }

  player = ''
  newGameHasBeenStarted = signal(false)
  playerHasBeenChosen = signal(false)

  toggleGameStart() {
    this.newGameHasBeenStarted.update((newGameHasBeenStarted) => !newGameHasBeenStarted);
  }


  public changePlayer(playerChosen: string) {
    this.player = playerChosen
    this.playerService.choosePlayer(playerChosen)
    this.playerHasBeenChosen.update((playerHasBeenChosen) => !playerHasBeenChosen);
  }


}
