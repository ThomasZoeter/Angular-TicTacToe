import {
  Component, DoCheck,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  SimpleChanges
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
      <div class="center">
          <h3>GAME!</h3>
          <h4>Current player: {{ whosTurnIsIt }}</h4>


          <div class="playfield">
              @for (value of valueFields;let idx = $index;track idx) {
                  <button [disabled]="value !== ''"
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
  public whosTurnIsIt = ''
  public resultGame = 'Draw'
  public winningRow: number[] | null = null
  public addScreen = false

  constructor(private playerService: PlayerService, private resultService: ResultService, private router: Router ) {
  }

  fieldClicked(index: number) {
    if (this.whosTurnIsIt === this.player) {
      this.valueFields[index] = this.whosTurnIsIt
      this.whosTurnIsIt = this.whosTurnIsIt === 'X' ? 'O' : 'X'
    }
  }

  public gameFinished(result: string, winningRow: number[] | null) {
    this.resultGame = result
    this.resultService.gameStateAfterEnd(this.resultGame)
    this.winningRow = winningRow
    this.resultService.getWinningRow(this.winningRow)
  }

  private weGotAWinner(input: string[]): number[] | null {
    if(this.winconditionCheck(0,1,2,input) !== null) {
      return this.winconditionCheck(0,1,2,input)
    }
    if(this.winconditionCheck(3,4,5,input) !== null) {
      return this.winconditionCheck(3,4,5,input)
    }
    if(this.winconditionCheck(6,7,8,input) !== null) {
      return this.winconditionCheck(6,7,8,input)
    }
    if(this.winconditionCheck(0,3,6,input) !== null) {
      return this.winconditionCheck(0,3,6,input)
    }
    if(this.winconditionCheck(1,4,7,input) !== null) {
      return this.winconditionCheck(1,4,7,input)
    }
    if(this.winconditionCheck(2,5,8,input) !== null) {
      return this.winconditionCheck(2,5,8,input)
    }
    if(this.winconditionCheck(0,4,8,input) !== null) {
      return this.winconditionCheck(0,4,8,input)
    }
    if(this.winconditionCheck(0,1,2,input) !== null) {
      return this.winconditionCheck(2,4,6,input)
    }
    return null;
  }

  private winconditionCheck(n1: number, n2: number, n3: number, input: string[]): number[] | null {
    const winningRow: number[] = []
    if (input[n1] === input[n2] && input[n2] === input[n3] && input[n1] !== '') {
      winningRow[0] = n1
      winningRow[1] = n2
      winningRow[2] = n3
      return winningRow
    }
    return null
  }


  ngOnInit(): void {
    this.playerService.currentData.subscribe(player => this.player = player)
    this.whosTurnIsIt = this.player
  }

  ngDoCheck() {
    if (this.valueFields.lastIndexOf('') < 0) { //Check if game is a draw
      this.addScreen = true
      this.gameFinished(this.resultGame, null)
      this.router.navigate(['/game-ended'])
    }
    if (this.weGotAWinner(this.valueFields) !== null) { //check if I win
      console.log("I win!")
      this.resultGame = this.player
      this.gameFinished(this.resultGame, this.weGotAWinner(this.valueFields))
      this.router.navigate(['/game-ended'])
      return //otherwise the next if statement will also be executed
    }
    if (this.whosTurnIsIt !== this.player) { //opponent's turn
      // await new Promise(f => setTimeout(f, 3000));
      this.valueFields[this.valueFields.lastIndexOf('')] = this.whosTurnIsIt
      if (this.weGotAWinner(this.valueFields) !== null) { //check if opponent wins
        console.log("Opponent wins!")
        this.resultGame = this.player === 'X' ? 'O' : 'X'
        this.gameFinished(this.resultGame, this.weGotAWinner(this.valueFields))
        this.router.navigate(['/game-ended'])
      }
      this.whosTurnIsIt = this.whosTurnIsIt === 'X' ? 'O' : 'X' //switch player
    }
  }
}
