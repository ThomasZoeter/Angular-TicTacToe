import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ResultService} from '../services/result-game.service';
import {PlayerService} from '../services/choose-player.service';

@Component({
  selector: 'game-ended-view',
  standalone: true,
  styleUrl: 'game-ended-view.css',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
      <h1>Game ended. Result: {{ result }}</h1>
      <div> @if(winningRowString !== '') {
          <h1> WinningRow: {{ winningRowString }}</h1>
      }
      </div>
      <button routerLink="/start-game" >Start new game!</button>

      <div class="playfield">
          @for (value of valueFields;let idx = $index;track idx) {
              <button [disabled]=true
                      [class.field]="value !== ''">
              </button>
          }
      </div>
  `
})
export class GameEnded implements OnInit {
  public result = ''
  public winningRow: number[] | null = null
  public winningRowString = ''
  public valueFields = ['', '', '', '', '', '', '', '', '']
  // public resultState:number[] = []

  constructor(private resultService: ResultService, private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.resultService.currentResultData.subscribe(resultState => this.result = resultState)
    this.resultService.currentWinningRowData.subscribe(resultRow => this.winningRow = resultRow)
    // this.playerService.currentData.subscribe(result => this.player = result)
    if(this.winningRow !== null) {
      this.winningRowString = this.winningRow[0] + ', ' + this.winningRow[1] + ', ' + this.winningRow[2]
    }
  }

}
