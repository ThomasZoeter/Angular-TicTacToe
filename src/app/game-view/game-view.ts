import {
  Component, DoCheck,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {PlayerService} from '../services/choose-player.service';
import {ResultService} from '../services/result-game.service';
import {GameEnded} from '../game-ended-view/game-ended-view';

@Component({
  selector: 'game-view',
  standalone: true,
  styleUrl: 'game-view.css',
  imports: [
    RouterLink,
    RouterOutlet,
    GameEnded
  ],
  template: `
      <div class="center" animate.enter="enter-animation">
          <h1>Current player: {{ whoseTurnIsIt }}</h1>
          <div class="playfield">
              @for (value of valueFields;let idx = $index;track idx) {
                  <button [disabled]="value !== '' || (whoseTurnIsIt) !== (player) "
                          [class.field]="value === ''"
                          [class.selectedField]="value !== ''"
                          (click)="fieldClicked(idx)"> {{ value }}
                  </button>
              }
          </div>
      </div>
  `
})
export class Game implements OnInit, DoCheck {

  public valueFields = ['', '', '', '', '', '', '', '', '']
  public player = ''
  public opponent = ''
  public whoseTurnIsIt = ''
  public resultGame: boolean | null = null
  public winningRow: number[] | null = null

  constructor(private playerService: PlayerService,
              private resultService: ResultService,
              private router: Router,
              private ref: ChangeDetectorRef) {
  }

  fieldClicked(index: number) {
    if (this.whoseTurnIsIt === this.player) {
      this.valueFields[index] = this.player
      this.whoseTurnIsIt = this.opponent
    }
  }

  public gameFinished(result: boolean | null, winningRow: number[] | null) {
    this.resultGame = result
    this.resultService.gameStateAfterEnd(this.resultGame)
    this.winningRow = winningRow
    this.resultService.getWinningRow(this.winningRow)
  }

  private opponentsTurn() {
    this.valueFields[this.valueFields.lastIndexOf('')] = this.whoseTurnIsIt
    this.whoseTurnIsIt = this.player
    this.ref.detectChanges() // update view after array has changed
    if (this.weGotAWinner(this.valueFields) !== null) { //check if opponent wins
      this.resultGame = false
      this.gameFinished(this.resultGame, this.weGotAWinner(this.valueFields))
      this.router.navigate(['/game-ended'])
    }

  }

  private hasGameEnded(): boolean {
    if (this.weGotAWinner(this.valueFields) !== null) { //check if I win
      this.resultGame = true
      this.gameFinished(this.resultGame, this.weGotAWinner(this.valueFields))
      this.router.navigate(['/game-ended'])
      return true
    }
    if (this.valueFields.lastIndexOf('') < 0) { //Check if game is a draw
      this.gameFinished(this.resultGame, null)
      this.router.navigate(['/game-ended'])
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.playerService.currentData.subscribe(player => this.player = player)
    this.whoseTurnIsIt = this.player
    this.opponent = this.player === 'X' ? 'O' : 'X'
  }

  ngDoCheck() {
    if (!this.hasGameEnded()) {
      if (this.whoseTurnIsIt !== this.player) { //opponent's turn
        setTimeout(() => this.opponentsTurn(), 2000)
      }
    }
  }

  private weGotAWinner(input: string[]): number[] | null {
    if (this.winConditionCheck(0, 1, 2, input) !== null) {
      return this.winConditionCheck(0, 1, 2, input)
    }
    if (this.winConditionCheck(3, 4, 5, input) !== null) {
      return this.winConditionCheck(3, 4, 5, input)
    }
    if (this.winConditionCheck(6, 7, 8, input) !== null) {
      return this.winConditionCheck(6, 7, 8, input)
    }
    if (this.winConditionCheck(0, 3, 6, input) !== null) {
      return this.winConditionCheck(0, 3, 6, input)
    }
    if (this.winConditionCheck(1, 4, 7, input) !== null) {
      return this.winConditionCheck(1, 4, 7, input)
    }
    if (this.winConditionCheck(2, 5, 8, input) !== null) {
      return this.winConditionCheck(2, 5, 8, input)
    }
    if (this.winConditionCheck(0, 4, 8, input) !== null) {
      return this.winConditionCheck(0, 4, 8, input)
    }
    if (this.winConditionCheck(2, 4, 6, input) !== null) {
      return this.winConditionCheck(2, 4, 6, input)
    }
    return null;
  }

  private winConditionCheck(n1: number, n2: number, n3: number, input: string[]): number[] | null {
    const winningRow: number[] = []
    if (input[n1] === input[n2] && input[n2] === input[n3] && input[n1] !== '') {
      winningRow[0] = n1
      winningRow[1] = n2
      winningRow[2] = n3
      return winningRow
    }
    return null
  }
}
