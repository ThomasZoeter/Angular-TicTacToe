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

@Component({
  selector: 'game-view',
  standalone: true,
  styleUrl: 'game-view.css',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
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
  `
})
export class Game implements OnInit, DoCheck {

  public valueFields = ['', '', '', '', '', '', '', '', '']
  public player = ''
  public whosTurnIsIt = ''
  public resultGame = ''

  constructor(private playerService: PlayerService, private resultService: ResultService,private router: Router) {
  }

  fieldClicked(index: number) {
    this.valueFields[index] = this.whosTurnIsIt
    this.whosTurnIsIt = this.whosTurnIsIt === 'X' ? 'O' : 'X'
  }

  public gameFinished(result: string) {
    this.resultGame = result
    this.resultService.gameStateAfterEnd(this.resultGame)
  }

  private weGotAWinner(input: string[]): boolean {
    if(input[0]===input[1] && input[1]===input[2] && input[1] !== '') {
      return true
    }
    if(input[3]===input[4] && input[4]===input[5] && input[3] !== '') {
      return true
    }
    if(input[6]===input[7] && input[7]===input[8] && input[6] !== '') {
      return true
    }
    return true
  }


  ngOnInit(): void {
    this.playerService.currentData.subscribe(player => this.player = player)
    this.whosTurnIsIt = this.player
  }

  ngDoCheck() {
    if(this.valueFields.lastIndexOf('') < 0) {
      this.resultGame = this.player + " won!"
      this.gameFinished(this.resultGame)
      this.router.navigate(['/game-ended'])
    }

  }
}
