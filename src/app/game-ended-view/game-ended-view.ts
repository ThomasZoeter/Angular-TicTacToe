import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ResultService} from '../services/result-game.service';

@Component({
  selector: 'game-ended-view',
  standalone: true,
  styleUrl: 'game-ended-view.css',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
      <div class="center" animate.enter="enter-animation">
          <h1>Game ended. {{ resultMessageString }}</h1>
          <div> @if (winningRowString !== '') {
              <h1> WinningRow: {{ winningRowString }}</h1>
          }
          </div>
          <div class="playfield">
              @for (value of valueFields;let idx = $index;track idx) {
                  <button [disabled]=true
                          [class.fieldWin]="winningRow?.includes(idx) && result"
                          [class.fieldLost]="winningRow?.includes(idx) && !result">
                  </button>
              }
          </div>
          <button routerLink="/start-game">Start new game!</button>
      </div>
  `
})
export class GameEnded implements OnInit {
  public result: boolean | null = null
  public resultMessageString = ''
  public winningRow: number[] | null = null
  public winningRowString = ''
  public valueFields = ['', '', '', '', '', '', '', '', '']

  constructor(private resultService: ResultService) {
  }

  public createResultMessage() {
    if (this.result) {
      this.resultMessageString = 'You win!'
    } else if (!this.result) {
      this.resultMessageString = 'You lose'
    } else {
      this.resultMessageString = 'It is a draw!'
    }
  }

  ngOnInit(): void {
    this.resultService.currentResultData.subscribe(resultState => this.result = resultState)
    this.resultService.currentWinningRowData.subscribe(resultRow => this.winningRow = resultRow)
    this.createResultMessage()
    if (this.winningRow !== null) {
      this.winningRowString = this.winningRow[0] + ', ' + this.winningRow[1] + ', ' + this.winningRow[2]
    }
  }
}
